var ObjectId = require('mongoose').Schema.ObjectId,
    Schema = require('mongoose').Schema;

module.exports.name = 'Listing';
module.exports.get = function(mongoose) {

    var ListingSchema = new mongoose.Schema({
        source             : String,
        Data               : Schema.Types.Mixed,
        lastSyncDate       : Date
    }, { strict: true });

    return ListingSchema;
}