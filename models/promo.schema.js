var ObjectId = require('mongoose').Schema.ObjectId,
    Listing = require('./listing.schema');

module.exports.name = 'Promo';
module.exports.get = function(mongoose) {

    var PromoSchema = new mongoose.Schema({
        name               : {type:String, index: true},
        description        : String,
        restrictions       : String,
        tags               : [String],
        promoId            : String,
        barcode            : String,
        listing            : [Listing]
    }, { strict: true });

    return PromoSchema;
}