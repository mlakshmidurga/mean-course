const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
 const config = require('../config/passport');
exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            role:req.body.role
        });
        user.save()
        .then(result => {
            res.status(200).json({
            message:'user created!',
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


exports.userLogin = (req, res, next) => {
    let fetchedUser;
     User.findOne({ email: req.body.email }).then(user =>{
        //  console.log(user);
         if(!user){
             return res.status(401).json({
                 message: 'Auth Failed'
             });
         }
        fetchedUser = user;
         return bcrypt.compare(req.body.password, user.password)
     })
     .then(result => {
         //console.log(result);
         if(!result) {
             return res.status(401).json({
                 message: 'Auth Failed'
             });  
         }
         const token = jwt.sign({ userId: fetchedUser._id},
         "secret_this_should_be_longer",
         {expiresIn: '1hr'}
     );
    //   console.log(token);
         res.status(200).json({
             token: token,
             expiresIn: 3600,
             userId: fetchedUser._id,
             
            role: fetchedUser.role
         });
     })
     .catch(err => {
         console.log(err);
                 return res.status(401).json({
             message: 'Invalid Authentication Credentials!'
         });
     });
 }

//  require('../config/passport')(passport)
//  exports.userProfile =  passport.authenticate('jwt', {session: false}), (req, res ) => {
//     console.log(req.user);
    
//     return res.json(
//          (req.user)
//      );
//  }


 