module.exports.setRoutes = function (app, kit) {

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

        res.json([
            {name:'test name', locationId:'test'},
            {name:'test name 2', locationId:'test 2'}
        ]);
    });

    app.post('/admin/api/promotions', function (req, res, next) {
        var p = {
            page:{
                title:'QuadPass.com Administrator - Orders',
                className:'admin_Orders'
            }
        };

        //kit.yelp.business(req.body.promo.businessId, function (error, data) {
       //     if (error) return next(JSON.stringify(error));

            var Listing = kit.mongoose.model('Listing');
            var Promo = kit.mongoose.model('Promo');
            var l = new Listing({source:'yelp.v2', data:null});
            var promo = req.body.promo;
            promo.tags = (promo.tags) ? promo.tags.split(' ') : null;
            promo.listing = l;
            var p = new Promo(promo);

            p.save(function(error){
                res.json([{message:'Ok', code:0}]);
            });

        //});
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