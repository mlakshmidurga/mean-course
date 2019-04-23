const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const config = require('../config/passport');
exports.createAdmin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const admin = new Admin({
            email: req.body.email,
            password: hash,
            job_profile: req.body.job_profile
        });
        admin.save()
        .then(result => {
            res.status(200).json({
            message:'admin created!',
            result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Invalid authentication credentials!'
            
            });

        });
    });
 
}


exports.adminLogin = (req, res, next) => {
    let fetchedUser;
     Admin.findOne({ email: req.body.email }).then(admin =>{
        //  console.log(user);
         if(!admin){
             return res.status(401).json({
                 message: 'Auth Failed'
             });
         }
        fetchedAdmin = admin;
         return bcrypt.compare(req.body.password, admin.password)
     })
     .then(result => {
         //console.log(result);
         if(!result) {
             return res.status(401).json({
                 message: 'Auth Failed'
             });  
         }
         const token = jwt.sign({email: fetchedAdmin.email, adminId: fetchedAdmin._id, job_profile: fetchedAdmin.job_profile},
         "secret_this_should_be_longer",
         {expiresIn: '1hr'}
     );
    //  console.log(token);
         res.status(200).json({
             token: "JWT " + token,
             expiresIn: 3600,
             adminId: fetchedAdmin._id,
             email: fetchedAdmin.email
         });
     })
     .catch(err => {
         console.log(err);
                 return res.status(401).json({
             message: 'Invalid Authentication Credentials!'
         });
     });
 }

 require('../config/passport')(passport)
//  exports.userProfile =  passport.authenticate('jwt', {session: false}), (req, res ) => {
//     console.log(req.user);
    
//     return res.json(
//          (req.user)
//      );
//  }


 