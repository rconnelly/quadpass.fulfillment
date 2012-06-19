module.exports.setRoutes = function(app, kit) {


    app.get('/api', kit.middleware.redirIfNotLoggedIn, function(req, res) {
        res.json(req.user);
    });


    return app;
}
