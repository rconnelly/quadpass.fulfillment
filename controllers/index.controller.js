module.exports.setRoutes = function(app, kit) {

  app.get('/', function(req, res) {
    res.render('index', {
      page:{
        title: 'QuadPass.com',
        className: 'about'
      }
    });
  });

  app.get('/account', kit.middleware.redirIfNotLoggedIn, function(req, res) {
    res.json(req.user);
  });

  app.get('/bad', function(req, res){
    omgWtfBbq(); // undefined
  });

  return app;
}

