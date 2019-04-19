const express = require('express');
const  router = express.Router();
const UserController = require('../controllers/user');
router.post('/signup', UserController.createUser);
const passport = require('passport');
router.post('/login',UserController.userLogin);
// router.get('/profile',  UserController.userProfile);
router.get ('/profile', passport.authenticate('jwt', { session: false}),UserController.userProfile, (req,res) => {

    res.json({msg: "working now profile"})
    })
module.exports = router;