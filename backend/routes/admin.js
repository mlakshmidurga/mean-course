const express = require('express');
const  router = express.Router();
const AdminController = require('../controllers/admin');
router.post('/signup', AdminController.createAdmin);
const passport = require('passport');
router.post('/login',AdminController.adminLogin);
router.get ('/profile', passport.authenticate('jwt', { session: false}), (req,res) => {
    console.log(req.user);
    res.json(req.user)
    })
    
module.exports = router;