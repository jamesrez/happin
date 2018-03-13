const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Request = require('./Request');

// define the schema for our user model
const userSchema = mongoose.Schema({
    username : String,
    password : String,
    profilePicUrl : String,
    balance : String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
