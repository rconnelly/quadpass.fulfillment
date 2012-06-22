var _ = require('underscore')
    , async = require('async');


module.exports.init = {
    shopnode:function (app, kit) {
        _kit = kit;
        // remove existing webhooks
        kit.shopnode.webhooks.getAll(null, null, function (err, req, res, obj) {
            //assert.ifError(err);
            if (req.webhooks.count > 0) // create webhooks
            {
                //self.initWebhooks(app, kit);
            }
        });
    },

    initWebhooks:function (app, kit, onComplete) {
        _kit = kit;
        var removed = [];
        var added = [];

        async.series([function (onDeleteComplete) {
            kit.shopnode.webhooks.getAll(null, null, function (err, req, res, obj) {
                async.forEachSeries(req.webhooks, function (webhook, onDelete) {
                   kit.shopnode.webhooks.del({id:webhook.id}, function (err, req, res, obj) {
                        removed.push(webhook);
                        onDelete();
                    });
                }, onDeleteComplete);
            });
        },
            function (onAddComplete) {
                async.forEachSeries(kit.secrets.get('webhooks'), function (webhook, onAdd) {
                    console.log('post response');
                    /*_kit.shopnode.webhooks.post(webhook, function (err, req, res, obj) {
                        added.push(webhook);
                        onAdd();
                    });*/
                }, onAddComplete);
            }
        ],
            function () // called on completion
            {
                onComplete({added:added, removed:removed});
            });
    }
}