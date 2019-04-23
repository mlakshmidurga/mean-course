const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Admin = require('../models/admin');
const config = require('../config/database');
// const checkauth = require('../middleware/check-auth');
// const check = require('../../nodemon');
 const passport = require('passport');
const mongoose = require('mongoose');

module.exports = (passport, userType)=> {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.JWT_KEY;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        if(userType == 'admin'){
            Admin.getAdminById(jwt_payload.adminId, (err, admin)=>{
                if(err) return done(err, false);
                if(admin) return done(null, admin);
                return done(null, false);
            });
        }
        if(userType == 'user'){
            User.getUserById(jwt_payload.userId, (err, user)=>{
                if(err) return done(err, false);
                if(user) return done(null, user);
                return done(null, false);
            });
        }
    }));
}