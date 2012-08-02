var ObjectId = require('mongoose').Schema.ObjectId,
    Listing = require('./listing.schema');

module.exports.name = 'GiftCard';
module.exports.get = function(mongoose) {

    var GiftCardSchema = new mongoose.Schema({
        message            : { type: String },
        recipientName      : { type: String },
        recipientEmail     : { type: String, index: true },
        senderName         : { type: String },
        senderEmail        : { type: String, index: true },
        initialAmount      : { type: Number },
        customerId         : { type: String },
        mainImageUrl       : { type: String },
        suggestedListings  : [Listing]
    }, { strict: true });


    return GiftCardSchema;
}