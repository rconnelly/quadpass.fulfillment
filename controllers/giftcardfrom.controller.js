module.exports.setRoutes = function (app, kit) {

    app.redirect('order-gift', function (req, res, next) {
        res.render('orderpage', {
            page:{
                title:'Order Page',
                className:'orderpage'
            }
        });
    });

    app.get('/order-gift-from/:id', function (req, res) {

        kit.yelp.business(req.params.id, function (error, data) {
            if (error) return next(error);

            req.session.suggestedListing = data;
            req.session.save(function(err,result){
                res.render('orderpage', {
                    page:{
                        title:'Order Page',
                        className:'orderpage'
                    },
                    suggested: data
                });
            });
        });
    });

    return app;
}

