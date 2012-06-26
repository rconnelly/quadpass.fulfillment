// rename this, edit, be sure to add it to .gitignore

var isproduction = false;

module.exports.init = function (isProduction) {
    isproduction = isProduction;
};


module.exports.get = function (key) {
    return (this.isproduction) ? SECRETS.production[key] : SECRETS.development[key];
};

var SECRETS = {
    production:{
        sessionHash:'QuadPass1058234',

        mongoUrls:{
            data:'mongodb://quadio_dev:password@staff.mongohq.com:10046/quad_dev', // ends with slash = we append dbname based on pkg.name
            sess:'mongodb://quadio_dev:password@staff.mongohq.com:10046/quad_dev'
        },

        everyAuth:{
            fb:{
                appId:'433069003393202', appSecret:'6249bc42e5c47c1f6cf6cced24ff8063'
            }, twit:{
                consumerKey:'JLCGyLzuOK1BjnKPKGyQ', consumerSecret:'GNqKfPqtzOcsCtFbGTMqinoATHvBcy1nzCTimeA9M0'
            }
        }
    },
    development:{
        sessionHash:'QuadPass1058234',

        mongoUrls:{
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
        // ryan@quad.io
        yelp: {
            consumerKey: 'FreL9N_bpZKAeBVX6eeIlw',
            consumerSecret: 'myvmS_-W4kI5fAppidZWfy-D1Y4',
            token: 'Iyl6g9En-FRHyb0EsIOj3Zvo4jktlfbw',
            tokenSecret: 'LNgKbUhDf9ulHYyqELJSrx-2lzM'
        }
    }
}

