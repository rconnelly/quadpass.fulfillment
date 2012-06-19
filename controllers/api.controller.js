module.exports.setRoutes = function(app, kit) {

    app.get('/api', function(req, res) {
        res.json({id: 'test'});
    });


    return app;
}
