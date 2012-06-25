ObjectId = require('mongoose').Schema.ObjectId;

module.exports.name = 'Friend';
module.exports.get = function(mongoose) {

    var FriendSchema = new mongoose.Schema({
        name              : { type: String },
        email             : { type: String, index: true},
        userId            : { type: ObjectId }
    }, { strict: true });

    FriendSchema
        .virtual('displayName')
        .get(function () {
            return this.name;
        });

    return FriendSchema;
}