const express = require('express');
const  router = express.Router();
const UserController = require('../controllers/user');
router.post('/signup', UserController.createUser);
const passport = require('passport');
router.post('/login',UserController.userLogin);
// router.get ('/profile', passport.authenticate('jwt', { session: false}), (req,res) => {
//     console.log(req.user);
//     res.json(req.user)
//     })
    
module.exports = router;