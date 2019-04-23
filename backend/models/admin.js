const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const AdminSchema = mongoose.Schema({

    email: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    job_profile: {type: String, required: true}

});
AdminSchema.plugin(uniqueValidator);

const Admin = module.exports = mongoose.model('Admin', AdminSchema);


module.exports.getAdminById = function(id, callback) {
    Admin.findById(id, callback);
}
 
module.exports.getAdminByEmail = function(email, callback){
    const query = {
        email:email,
    }
    Admin.findOne(query, callback);
}