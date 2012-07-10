var ObjectId = require('mongoose').Schema.ObjectId,
    Schema = require('mongoose').Schema;


module.exports.name = 'Listing';
module.exports.listingCacheLifetimeSeconds = 2592000; // 30 days
module.exports.get = function(mongoose, kit) {

    var ListingSchema = new mongoose.Schema({
        source             : String,
        businessId         : String,
        data               : Schema.Types.Mixed,
        lastSyncDate       : Date
    }, { strict: true });

    return ListingSchema;
}