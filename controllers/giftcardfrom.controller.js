module.exports.setRoutes = function(app, kit) {

    app.get('/gift-card-from/:slug', function(req, res) {
        res.render('orderpage', {
            page:{
                title: 'Order Page',
                className: 'orderpage'
            }
        });
    });

    return app;
}

