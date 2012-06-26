var util = require('util')
    , fs = require('fs');

module.exports.setRoutes = function (app, kit) {

    app.get('/', function (req, res) {

        res.render('index', {
            page:{
                title:'QuadPass.com',
                className:'about',
            },
            searchResult:{ businesses:[] },
            term:'Restaurants',
            location:'Atlanta, GA'
        });
    });

    app.get('/account', kit.middleware.redirIfNotLoggedIn, function (req, res) {
        res.json(req.user);
    });

    app.redirect('gifts-for', function (req, res) {
        if (!req.query.location || !req.query.term)
            return '/';
        else
            return util.format('/gifts-for/%s/%s', req.query.term, req.query.location);
    });

    app.get('/gifts-for', function (req, res, next) {
        res.redirect('gifts-for');
    });


    app.get('/gifts-for/:term/:location', function (req, res, next) {
        var p = req.params;

        /*
        res.render('index', {
            page:{
                title:'QuadPass.com',
                className:'about'
            },
            searchResult:require('../test/data/atlanta-bar-result').data,
            term:p.term,
            location:p.location,
            error:null
        });
        */

        kit.yelp.search({term:p.term, location:p.location}, function (error, data) {
            if (error) return next(error);

            res.render('index', {
                page:{
                    title:'QuadPass.com',
                    className:'about'
                },
                searchResult:data,
                term:p.term,
                location:p.location,
                error:error
            });
        });


    });

    app.get('/bad', function (req, res) {
        omgWtfBbq(); // undefined
    });

    return app;
}

