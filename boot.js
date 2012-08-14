var IS_PROD = process.env['NODE_ENV'] == 'production';

/**
 * std libs
 */
var express = require('express')
    , fs = require('fs'),
    util = require('util')

/**
 *  third party
 */

    , async = require('async')

/**
 * custom libs
 */
    , libMisc = require('./lib/misc.js')
    , libMiddleware = require('./lib/middleware.js')

/**
 * pkg info
 */
    , pkg = require('./package.json')
    , pkgAuthor = libMisc.parsePerson(pkg.author);

console.log("BOOTING UP " + pkg.name + " v" + pkg.version + " / node v" + process.versions.node + "...");


/**
 * Kit
 */

var sc = require('./etc/secrets.js');
sc.init(IS_PROD);

var log = require('restify').log;
log.level(log.Level.Trace);
//var Loggly = require('loggly');
//var loggly = Loggly.createClient(sc.get('loggly'));

/** Yelp **/

var yelp = require("yelp").createClient({
    consumer_key:sc.get('yelp').consumerKey, consumer_secret:sc.get('yelp').consumerSecret, token:sc.get('yelp').token, token_secret:sc.get('yelp').tokenSecret
});



var kit = {
    model:{}, dateformat:require('dateformat'),
    secrets:sc,
    log:log,
    //loggly: loggly,
    parallelize:libMisc.parallelize,
    middleware:libMiddleware.base,
    yelp:yelp,
    port:sc.get('port'),
    stripe: sc.get('stripe')
};

/** Yelp Helpers */
kit.yelp.DEFAULT_TERM = 'Restaurants';
kit.yelp.DEFAULT_LOCATION = 'Atlanta, GA';

kit.yelp.searchStd = function (params, callback) {
    var maxCount = 1000; // yelp imposed limit
    var limit = params.limit || 18;
    var page = params.page || 1;
    var offset = (page - 1) * limit;
    var location = params.location;// || kit.yelp.DEFAULT_LOCATION;
    var term = params.term || kit.yelp.DEFAULT_TERM;
    offset = offset <= (maxCount - limit) ? offset : maxCount - limit;
    kit.yelp.search({term:term, location:location, limit:limit, offset:offset}, function (error, data) {
        var total = (data.total > maxCount) ? maxCount : data.total
        callback(error,
            {
                searchResult:data,
                term:term,
                location:location,
                error:error,
                pageCount:Math.floor(total / limit),
                pageNumber:page
            });
    });
};

/**
 * Underscore
 */
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
kit.underscore = _;

var m = kit.secrets.get('mongoUrls')
    , MONGO_SESS_URL = m.sess + (m.sess.charAt(m.sess.length - 1) == '/' ? pkg.name + '-sess' : '')
    , MONGO_DATA_URL = m.data + (m.data.charAt(m.data.length - 1) == '/' ? pkg.name + '-data' : '')


var app = express.createServer();

/** Setup **/

var up = function (onStartup) {

    async.series({
        // session setup
        sessionSetup:function (callback) {
            var MongoStore = require('connect-mongodb');

            kit.log.info('Connecting to session database...')
            kit.sessionStorage = new MongoStore({ url:MONGO_SESS_URL }, function (err) {
                if (err)
                {
                    kit.log.error(err)
                    callback(err);
                }
                else {

                    kit.log.info('Session ok.')
                    kit.middleware.session = express.session({
                        store:kit.sessionStorage, secret:kit.secrets.get('sessionHash'), cookie:{ maxAge:1000 * 60 * 60 * 24 * 7 } // one week
                    });

                    callback();
                }
            });

        },
        // datastore and authentication setup
        dsSetup:function (callback) {

            kit.log.info('Setting up datastore...')
            /**
             * Mongo ODM
             */
            var mongoose = require('mongoose');
            mongoose.connect(MONGO_DATA_URL);

            /**
             * Schemas
             */
            var schemas = {};
            _.forEach(fs.readdirSync('./models'), function (file) {
                if (file.match(/\.js$/)) {
                    var s = require('./models/' + file);
                    if (s.name) {
                        schemas[s.name] = s.get(mongoose, kit);
                    }
                }
            });
            mongoose.plugin(require('./lib/timestamps.js').useTimestamps);
            kit.mongoose = mongoose;
            /**
             * Auth
             */
            var mongooseAuth = require('mongoose-auth');
            require('./lib/auth.js').config(kit, schemas.User, mongooseAuth);
            kit.mongooseAuth = mongooseAuth;
            /**
             * Models
             */
            _.forEach(schemas, function (schema, name) {
                kit.model[name] = mongoose.model(name, schema);
            });

            kit.log.info('Datastore setup complete.')
            callback();

        },
        // server setup
        serverSetup:function (callback) {

            /**
             * Connect
             */

            app.configure('development', function () {
                if (!module.parent) {
                    // app.use(express.profiler());
                    app.use(express.logger('dev'));
                }
            });

            app.configure(function () {
                app.set('views', __dirname + '/views');
                app.set('view engine', 'jade');
                app.set('view options', { layout:false, pretty:true });
                app.use(express.favicon());
                app.use(express.static(__dirname + '/public'));

                app.use(express.query());
                app.use(express.bodyParser());
                app.use(express.cookieParser());
                app.use(kit.middleware.session);

                //app.use(kit.middleware.geoip);
                app.use(function (req, res, next) {
                    res.locals(
                        {
                            meta:{ title:pkg.name, desc:pkg.description, version:pkg.version, author:pkgAuthor
                        }, page:{
                            className:''
                        },
                            status:null,
                            jquery:true,
                            bootstrap:true,
                            stylesheets:[],
                            scripts:[],
                            req:req,
                            dateformat:kit.dateformat, path:'' // kit.middleware.parsePath will populate from route, errors:{}
                        });
                    next();
                });

                app.use(express.methodOverride());
                app.use(express.csrf());

                app.use(kit.mongooseAuth.middleware());
                app.use(kit.mongooseAuth.middleware());

                app.use(app.router); // cf https://github.com/bnoguchi/mongoose-auth/issues/52
            });

            app.configure('development', function () {
                app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
            });

            app.configure('production', function () {
                app.use(express.errorHandler());
            });


            /**
             * Dynamic View Helpers
             */
            kit.mongooseAuth.helpExpress(app);

            /**
             * Routes
             */
            fs.readdirSync('./controllers').forEach(function (file) {
                if (file.match(/\.js$/)) {
                    require('./controllers/' + file).setRoutes(app, kit);
                }
            });

            app.use(kit.middleware.fourOhFour);

            process.on('uncaughtException', function (exception) {
                // danger! see https://github.com/joyent/node/issues/2582
                //kit.log.error("\nUncaughtException: " + util.inspect(exception));
            });

            app.listen(kit.port, function () {
                kit.log.info("%s - Listening on port %d in %s mode"
                    , (new Date()).toISOString()
                    , app.address().port
                    , app.settings.env
                );

                callback();
            });

        }
    }, onStartup);
}

module.exports = {
    up:up, app:app, kit:kit
}

