// rename this, edit, be sure to add it to .gitignore

var isproduction = false;

module.exports.init = function (isProduction) {
    isproduction = isProduction;
};


module.exports.get = function (key) {
    return (isproduction) ? SECRETS.production[key] : SECRETS.development[key];
};

var SECRETS = {
    production:{
        port: 80,
        sessionHash:'QuadPass1058234',

        mongoUrls:{
            data: 'mongodb://nodejitsu:dab6833cd9468f3ba5d129d5706d63bb@staff.mongohq.com:10021/nodejitsudb29726924367',
            sess: 'mongodb://nodejitsu:dab6833cd9468f3ba5d129d5706d63bb@staff.mongohq.com:10021/nodejitsudb29726924367'
           // data:'mongodb://quadio_dev:password@staff.mongohq.com:10046/quad_dev', // ends with slash = we append dbname based on pkg.name
           // sess:'mongodb://quadio_dev:password@staff.mongohq.com:10046/quad_dev'
        },

        everyAuth:{
            fb:{
                appId:'433069003393202', appSecret:'6249bc42e5c47c1f6cf6cced24ff8063'
            }, twit:{
                consumerKey:'JLCGyLzuOK1BjnKPKGyQ', consumerSecret:'GNqKfPqtzOcsCtFbGTMqinoATHvBcy1nzCTimeA9M0'
            }
        },
        // ryan.connelly@gmail.com
        /*yelp: {
         consumerKey: 'V3LmcsEQDwzoFjUyBackmg',
         consumerSecret: 'qy87diBYhTioXfoFatIegxEaBRE',
         token: 'Q4w2l5lWkjxHDLk5kd-AIwpXEL8UnWV_',
         tokenSecret: 'PqoALKtcS2ReRRDPj9fRrusVDtg'
         },*/
        // hello@quad.io
        /*
        yelp: {
            consumerKey: 'FxSU5voRk9tvFWQ2u8yP8w',
            consumerSecret: 'RtnznbOXNEkO3OWHhgbT2UM2cEs',
            token: '3IAlLCK6fxXJ3_3Aefa0Cfry9WlEztCk',
            tokenSecret: 'ERpuemPjISEYTqQonkcZylraYl4'
        },*/
        // ryan@quad.io
        yelp:{
            consumerKey:'FreL9N_bpZKAeBVX6eeIlw',
            consumerSecret:'myvmS_-W4kI5fAppidZWfy-D1Y4',
            token:'Iyl6g9En-FRHyb0EsIOj3Zvo4jktlfbw',
            tokenSecret:'LNgKbUhDf9ulHYyqELJSrx-2lzM'
        },
        stripe: {
            publicKey: 'pk_vrY9IoQaCla49cnwc5J1RuwLZAYUb',
            privateKey: 'qujiolVIQuL1DrfgHFv4xkPQ6VnIXJOP',
            isTestAccount: true
        },
        aws: {
            key: 'AKIAJ4JXUTBGGDQXMAGQ',
            secret: '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',
            bucket: 'quadpass'
        }
    },
    development:{
        port: 3000,
        sessionHash:'QuadPass1058234',

        mongoUrls:{

            //data: 'mongodb://nodejitsu:dab6833cd9468f3ba5d129d5706d63bb@staff.mongohq.com:10021/nodejitsudb29726924367',
            //sess: 'mongodb://nodejitsu:dab6833cd9468f3ba5d129d5706d63bb@staff.mongohq.com:10021/nodejitsudb29726924367'
            //data:'mongodb://quadio_dev:password@staff.mongohq.com:10046/quad_dev', // ends with slash = we append dbname based on pkg.name
            //sess:'mongodb://quadio_dev:password@staff.mongohq.com:10046/quad_dev'
            data:'mongodb://admin:pass123@localhost:27017/quad_dev', // ends with slash = we append dbname based on pkg.name
            sess:'mongodb://admin:pass123@localhost:27017/quad_dev'
        },

        everyAuth:{
            fb:{
                appId:'433069003393202', appSecret:'6249bc42e5c47c1f6cf6cced24ff8063'
            }, twit:{
                consumerKey:'JLCGyLzuOK1BjnKPKGyQ', consumerSecret:'GNqKfPqtzOcsCtFbGTMqinoATHvBcy1nzCTimeA9M0'
            }
        },
        // ryan.connelly@gmail.com
        /*yelp: {
            consumerKey: 'V3LmcsEQDwzoFjUyBackmg',
            consumerSecret: 'qy87diBYhTioXfoFatIegxEaBRE',
            token: 'Q4w2l5lWkjxHDLk5kd-AIwpXEL8UnWV_',
            tokenSecret: 'PqoALKtcS2ReRRDPj9fRrusVDtg'
        },*/
        // hello@quad.io
        /*
         yelp: {
         consumerKey: 'FxSU5voRk9tvFWQ2u8yP8w',
         consumerSecret: 'RtnznbOXNEkO3OWHhgbT2UM2cEs',
         token: '3IAlLCK6fxXJ3_3Aefa0Cfry9WlEztCk',
         tokenSecret: 'ERpuemPjISEYTqQonkcZylraYl4'
         },*/
        // ryan@quad.io
        yelp:{
         consumerKey:'FreL9N_bpZKAeBVX6eeIlw',
         consumerSecret:'myvmS_-W4kI5fAppidZWfy-D1Y4',
         token:'Iyl6g9En-FRHyb0EsIOj3Zvo4jktlfbw',
         tokenSecret:'LNgKbUhDf9ulHYyqELJSrx-2lzM'
         },
        stripe: {
            publicKey: 'pk_vrY9IoQaCla49cnwc5J1RuwLZAYUb',
            privateKey: 'qujiolVIQuL1DrfgHFv4xkPQ6VnIXJOP',
            defaultAccount:
                {
                    ccnum: '4242424242424242',
                    exp: '05/2025',
                    cvc: '123'
                },
            isTestAccount: true
        },
        aws: {
            key: 'AKIAJ4JXUTBGGDQXMAGQ',
            secret: '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',
            bucket: 'quadpass-dev'
        },
        youtube: {
            developerKey: 'AI39si55k088WGB97tg8UASWfKYkIcYfUZJyC8KF3UW_WxhWrJfcZkOpKTvjcy82owcCAxPeCCJQkQUWz5cK1n8qzqiL7QZPOQ'
        }
    }
}

