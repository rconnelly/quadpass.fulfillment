var ObjectId = require('mongoose').Schema.ObjectId;

module.exports.name = 'GiftCard';
module.exports.get = function(mongoose) {

    var GiftCardSchema = new mongoose.Schema({
        title              : { type: String },
        recipientEmail     : { type: String, index: true },
        senderEmail        : { type: String, index: true },
        initialAmount      : { type: Number },
        customerId         : { type: String },
        mainImageUrl       : { type: String }
    }, { strict: true });


    return GiftCardSchema;
}