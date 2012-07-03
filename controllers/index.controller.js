var util = require('util')
    , fs = require('fs');

module.exports.setRoutes = function (app, kit) {


    var yelpSearch = kit.yelp.searchStd;

    app.get('/', function (req, res, next) {
        var p = {
            term:req.session.term,
            location:req.session.location
        };

        p.page = {
            title:'QuadPass.com',
            className:'index'
        };

        res.render('index', p);

        /*yelpSearch(p, function (error, data) {
            if (error) return next(JSON.stringify(error));

            data.page = {
                title:'QuadPass.com',
                className:'index'
            };


            res.render('index', data);
        }); */
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

    app.redirect('home', function (req, res) {
        return '/';
    });

    app.redirect('payment', function (req, res) {
        return '/payment';
    });

    app.get('/gifts-for', function (req, res, next) {
        res.redirect('gifts-for');
    });

    app.post('/orderpage', function (req, res, next) {
        req.session.order = req.body;
        res.redirect('payment');
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

            res.render('list', data);
        });
    });

    app.get('/partial/gifts-for/:term/:location', function (req, res, next) {
        var p = req.params;
        p.page = req.query.page;
        yelpSearch(p, function (error, data) {
            if (error) return next(JSON.stringify(error));
            res.render('includes/_locations', data);
        });
    });

    app.post('/payment', function (req, res, next) {
        var api_key = kit.stripe.privateKey;
        var stripe = require('stripe')(api_key);
        var paymentName = req.body.payment.ccname;
        var amount = parseInt(req.session.order.gift.amount) * 100;
        var token = req.body.stripeToken;
        stripe.charges.create({card:token,
            description:paymentName, currency:'usd',
            amount:amount }, function (err, charge) {
            if (err)
                next(err);
            else {

                var p = {
                    term:req.session.term,
                    location:req.session.location
                };

                p.page = req.query.page;

                yelpSearch(p, function (error, data) {
                    if (error) return next(JSON.stringify(error));

                    data.page = {
                        title:'QuadPass.com',
                        className:'index'
                    };
                    data.alert = {
                        type:'success',
                            message:'Thanks for your order! We will build the e-card and send it to your friend shortly!'
                    };

                    res.render('index', data);
                });

                kit.log.debug("created charge with id:", charge.id);
            }
        });
    });

    app.get('/payment', function (req, res, next) {
        var p = req.params;
        p.page = req.query.page;
        res.render('payment', {
            page:{
                title:'Payment',
                className:'payment'
            },
            publicKey:kit.stripe.publicKey,
            defaultAccount:(kit.stripe.isTestAccount && kit.stripe.defaultAccount) ? kit.stripe.defaultAccount : {}
        });
    });

    return app;
}
