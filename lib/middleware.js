function mkRenderStatus(code, text) {
  var codeStr = code.toString();
  return function(req, res) {
    res.render('status', {
      status: code,
      statusText: text,
      page: {title:codeStr, className:'status'+codeStr} 
    });
  }
}

/**
 *  re-usable middleware
 */

module.exports.base = {

  fourOhFour: mkRenderStatus(404, "Page Not Found"),

  badRequest: mkRenderStatus(400, "Bad Request"),

  redirIfNotLoggedIn: function(req, res, next) {
    if(req.loggedIn) return next();
    req.flash('warning', "You need to log in first!");
    res.redirect('home');
  },
  
  parsePath: function(req, res, next) {
    var path = req.route.path, params = req.params;
    for (var k in params) { path = path.replace(new RegExp("\:"+k+"[^\\.\\/]*"), params[k]||''); }
    var lastChar = path.length-1;
    if(path.lastIndexOf('/')==lastChar) { path = path.substr(0,lastChar); }
    if(req.method=='GET') { 
      req.session.debug && req.flash('info', '%s - GET %s', Date.now(), path);
      req.session.lastGetPath = path;
    }
    res.locals({ path:path });
    next();
  },

  geoip: function(req, res, next) {
      var geoip = require('geoip');
      var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      if(ip == '127.0.0.1' || ip == '')
        ip = '76.97.225.151'; // default to atlanta
      var g = new geoip.City('data/GeoIPCity.dat');
      g.lookup(ip, function(err, data) {
          if (err) next(error);

        res.locals({loc:data});
        next();
    });
  }
}

