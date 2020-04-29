// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;




// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
      userName     : {type: String, required : true, unique: true},
        firstName    : {type: String, required : true},
        lastName     : {type: String, required : true},
        email        : String,
        password     : String,
        red          : Number,
        blue         : Number,
        green        : Number,
        purple       : Number,
        yellow       : Number,

    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
