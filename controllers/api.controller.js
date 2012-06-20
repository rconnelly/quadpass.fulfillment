var crypto = require('crypto'),
    util = require('util');

var getCalculatedHmac = function (sharedKey, data) {
    var hmac = crypto.createHmac('sha256', sharedKey);
    hmac.update(data);
    var calculatedHmac = hmac.digest('base64').strip();
    return calculatedHmac;
}

module.exports.setRoutes = function (app, kit) {

// ## Webhooks

    app.get('/api/webhooks/orders/create', function (req, res) {
        console.log('received webhook message: ' + util.inspect(req) + '\nres: ' + util.inspect(res))

        req.order
        //var receivedHmac =
        //var hmac = getCalculatedHmac()
        //    console.log('Invalid hmac')

        res.json(null);
    });

    app.get('/api/webhooks/init', function (req, res) {
        require('../lib/init.js').init.initWebhooks(app, kit, function (result) {
            res.json(result);
        });
    });

    app.get('/api/webhooks', function (req1, res1) {
        kit.shopnode.webhooks.getAll(null, null, function (err, req, res, obj) {
            res1.json(req.webhooks);
        });
    });

// ## Fulfilment

    app.get('/api/order/fulfillment/process', function (req1, res1) {
        // get all unshipped, paid orders
        var queryParams = { limit:250, fulfillment_status:'unshipped', financial_status:'paid'};
/*
        async.series({
            orders: function (callback) {
                kit.shopnode.orders.getAll(null, queryParams, function (err, req, res, obj) {
                    kit.log.debug('Processing orders:\n' + util.inspect(req.orders));

                    res1.json(req.orders);
                });
            }
            , function (callback) {
                kit.shopnode.orders.getAll(null, queryParams, function (err, req, res, obj) {
                    kit.log.debug('Processing orders:\n' + util.inspect(req.orders));

                    res1.json(req.orders);
                });
            }, function () {
            }
        ]);
        */
    });

    return app;
}
