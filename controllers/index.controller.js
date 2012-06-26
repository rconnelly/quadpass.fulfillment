var util = require('util')
    , fs = require('fs');

module.exports.setRoutes = function (app, kit) {

    var yelpSearch = function (params, callback) {
        var maxCount = 1000; // yelp imposed limit
        var limit = params.limit || 18;
        var page = params.page || 1;
        var offset = (page - 1) * limit;
        var location = params.location || "Atlanta, GA";
        var term = params.term || 'Restaurants';
        offset = offset <= (maxCount - limit) ? offset : maxCount - limit;
        kit.yelp.search({term:term, location:location, limit:limit, offset:offset}, function (error, data) {
            var total = (data.total > maxCount) ? maxCount : data.total
            callback(error,
                {
                    searchResult:data,
                    term:params.term,
                    location:params.location,
                    error:error,
                    pageCount: Math.floor(total / limit),
                    pageNumber:page
                });
        });
    }

    app.get('/', function (req, res) {
        var p = {
            term:req.session.term,
            location:req.session.location
        };

        p.page = req.query.page;

        yelpSearch(p, function (error, data) {
            if (error) return next(JSON.stringify(error));

            data.page = {
                title:'QuadPass.com',
                className:'about'
            };

            res.render('index', data);
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

    app.get('/gifts-for/:term/:location?', function (req, res, next) {
        var p = req.params;
        req.session.term = p.term;
        req.session.location = p.location;
        p.page = req.query.page;

        yelpSearch(p, function (error, data) {

            if (error) return next(JSON.stringify(error));

            data.page = {
                title:'QuadPass.com - Order Gift Page',
                className:'orderpage'
            };

            res.render('index', data);
        });

    });

    app.get('/bad', function (req, res) {
        omgWtfBbq(); // undefined
    });

    return app;
}

