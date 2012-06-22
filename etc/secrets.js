// rename this, edit, be sure to add it to .gitignore

module.exports.get = function (key) {
    return SECRETS[key];
};

var SECRETS = {

    sessionHash:'HELLOWORLD',

    mongoUrls:{
        data:'mongodb://quadio_dev:password@staff.mongohq.com:10046', // ends with slash = we append dbname based on pkg.name
        sess:'mongodb://quadio_dev:password@staff.mongohq.com:10046/quad_dev'
    },

    everyAuth:{
        fb:{
            appId:'433069003393202', appSecret:'6249bc42e5c47c1f6cf6cced24ff8063'
        }, twit:{
            consumerKey:'JLCGyLzuOK1BjnKPKGyQ', consumerSecret:'GNqKfPqtzOcsCtFbGTMqinoATHvBcy1nzCTimeA9M0'
        }
    },
    shopify:{
        "storeHost":'quadpass-com.myshopify.com',
        "apiKey":'7fae0b4000890ffaf69296f8d99758e1',
        "password":'3f028ee17ce583a3362e4d388e6bda91',
        "sharedSecret":'820cc67be355dc9153c6d7932d494efc',
        "useBasicAuth":true
    },
    webhooks:[
        {
            "webhook":{
                "topic":"orders/create",
                "address":"http://76.97.225.151:3000/api/webhooks/order/create",
                "format":"json"
            }
        }
    ]
}

