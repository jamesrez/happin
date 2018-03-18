const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
const requestSchema = mongoose.Schema({
    title : String,
    body : String,
    owner : String,
    location : {
      lat : String,
      lon : String
    },
    helperSpotsOpen : Number,
    helperSpotsMax : Number,
    helpers : [{
      username : String,
      location : {
        lat : String,
        lon : String
      }
    }],
    payout : String
});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Request', requestSchema);
