const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    role: {type: String,  default: 'user'}

});
userSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('User', userSchema);


module.exports.getUserById = function(id,callback) {
    User.findById(id, callback);
}
 
module.exports.getUserByEmail = function(email,callback){
    const query = {
        email:email,
    }
    User.findOne(query, callback);
}