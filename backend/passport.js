const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');

// const checkauth = require('../middleware/check-auth');
// const check = require('../../nodemon');
// const passport = require('passport');
const mongoose = require('mongoose');

module.exports = (passport)=> {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.JWT_KEY;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        User.getUserById(jwt_payload.data._id, (err, user)=>{
            if(err) return done(err, false);
            if(user) return done(null, user);
            return done(null, false);
        });
    }));
}