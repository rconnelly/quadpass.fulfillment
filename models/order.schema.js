var ObjectId = require('mongoose').Schema.ObjectId,
    GiftCard = require('./giftcard.schema');

module.exports.name = 'Order';
module.exports.get = function(mongoose) {

    var OrderSchema = new mongoose.Schema({
        userId             : { type: ObjectId },
        giftCards          : [GiftCard],
        sendDate           : { type: Date },
        receivedDate       : { type: Date },
        retryCount         : { type: Number }
    }, { strict: true });

    return OrderSchema;
}