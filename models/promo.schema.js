var ObjectId = require('mongoose').Schema.ObjectId,
    Listing = require('./listing.schema');

module.exports.name = 'Promo';
module.exports.get = function(mongoose, kit) {

    var PromoSchema = new mongoose.Schema({
        name               : {type:String, index: true},
        description        : String,
        restrictions       : String,
        tags               : [String],
        promoId            : String,
        barcode            : String,
        listings            : [Listing]
    }, { strict: true });

    // Save yelp listing
    PromoSchema.pre('save', function (next, done) {
        if (this.isNew && this.listings.length > 0) {
            var l = this.listings[0];
            kit.yelp.business(l.businessId, function (error, data) {
                l.data = data;
                l.lastSyncDate = new Date();
                var err = (error) ? new Error(error.text) : null;
                next(err);
            });
        }
        else {
            next();
        }
    });

    return PromoSchema;
}