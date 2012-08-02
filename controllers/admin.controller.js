module.exports.setRoutes = function (app, kit) {

    var Promo = kit.model.Promo,
        Listing = kit.model.Listing;

    app.get('/admin', function (req, res, next) {
        var p = {
            page:{
                title:'QuadPass.com Administrator - Dashboard',
                className:'admin_home'
            }
        };

        res.render('admin/index', p);
    });

    app.get('/admin/promotions', function (req, res, next) {
        var p = {
            page:{
                title:'QuadPass.com Administrator - Promotions',
                className:'admin_promotions'
            },
            pageNumber:0,
            pageCount:0
        };

        res.render('admin/promotions', p);
    });

    app.get('/admin/orders', function (req, res, next) {
        var p = {
            page:{
                title:'QuadPass.com Administrator - Orders',
                className:'admin_Orders'
            }
        };

        res.render('admin/orders', p);
    });


    /** api **/
    app.get('/admin/api/promotions', function (req, res, next) {
        var p = {
            page:{
                title:'QuadPass.com Administrator - Orders',
                className:'admin_Orders'
            }
        };

        Promo.find([],[],[],function(err,docs){
            var json = kit.underscore.map(docs,function(doc) { var d = doc.toJSON(); d.locationName = doc.get('listings')[0].data.name; return d; });
             res.json(json);
        });
    });

    var savePromo = function (promo, callback, next) {
        var _save = function (doc) {
            doc.save(function(err, response) {
                if (err) return next(JSON.stringify(err));
                callback(response._doc);
            });
        }

        if (promo.id) {
            Promo.findById(promo.id, function (err, doc) {
                if (err) return next(JSON.stringify(err));

                kit.underscore.extend(doc, promo)
                _save(doc);
            });
        }
        else {
            var p = new Promo(promo);
            p.listings.push({businessId:promo.businessId});
            _save(p);
        }
    };

    app.put('/admin/api/promotions', function (req, res, next) {
        var promo = req.body;
        savePromo(promo, function (result) {
            res.json(result);
        }, next);
    });

    app.post('/admin/api/promotions', function (req, res, next) {
        var promo = req.body;
        savePromo(promo, function (result) {
            res.json(result);
        }, next);
    });

    app.get('/admin/api/promotions/:id', function (req, res, next) {
        var p = {
            page:{
                title:'QuadPass.com Administrator - Orders',
                className:'admin_Orders'
            }
        };

        res.json({name:'test name', locationId:'test'});
    });

    app.get('/admin/api/businesses/search', function (req, res, next) {
        var p = req.params;
        req.session.term = p.term;
        req.session.location = p.location;
        p.page = req.query.page;

        kit.yelp.searchStd(p, function (error, data) {
            if (error) return next(JSON.stringify(error));
            res.json(data);
        });
    });

    app.get('/admin/api/businesses', function (req, res, next) {
        var p = req.query;
        req.session.term = p.term;
        req.session.location = p.location;
        p.page = req.query.page;

        kit.yelp.searchStd(p, function (error, data) {
            if (error) return next(JSON.stringify(error));
            res.json(data.searchResult.businesses);
        });
    });
};