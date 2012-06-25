var ObjectId = require('mongoose').Schema.ObjectId
    , Friend = require('./friend.schema');

module.exports.name = 'User';
module.exports.get = function(mongoose) {

  var UserSchema = new mongoose.Schema({
      name              : { type: String },
      friends           : [Friend]
  }, { strict: true });

  UserSchema
    .virtual('displayName')
    .get(function () {
      return this.twit.name || this.fb.name.full || this.login;
    });

  return UserSchema;
}