// ===============================================
// ================ Dependancies =================
// ===============================================
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


// ===============================================
// ================ Define Schema ================
// ===============================================
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


// ===============================================
// ============ Pre Command Function =============
// ===============================================
UserSchema.pre('save', function(callback) {
  var user = this;

  if (!user.isModified('password')) 
  	return callback();

  bcrypt.genSalt(5, function(err, salt) {
    if (err) 
    	return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) 
      	return callback(err);

      user.password = hash;
      callback();
    });
  });
});


// ===============================================
// ============ Passowrd Verification ============
// ===============================================
UserSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) 
      return callback(err);
    
    callback(null, isMatch);
  });
};


// ===============================================
// =================== Export ====================
// ===============================================
module.exports = mongoose.model('User', UserSchema);