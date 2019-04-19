const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email: {type: String, required: true, unique: true },
    password: {type: String, required: true}

});
userSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('User', userSchema);


module.exports.getUserById = function(id,callback) {
    User.findById(id, callback);
}