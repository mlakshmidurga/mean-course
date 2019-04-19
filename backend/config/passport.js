const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
// const checkauth = require('../middleware/check-auth');
// const check = require('../../nodemon');
// const passport = require('passport');
const mongoose = require('mongoose');

module.exports = (passport)=> {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.JWT_KEY;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        User.findOne(jwt_payload._id, (err, user)=>{
            if(err) return done(err, false);
            if(user) return done(null, user);
            return done(null, false);
        });
    }));
}