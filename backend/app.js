const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const app = express();
const config = require('./config/database');
require('./config/passport')(passport)
mongoose.connect(config.database, { useNewUrlParser: true }
)
.then(() => {
console.log("connected to database");
})
.catch(() => {
    console.log("connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
require('./config/passport')(passport)
app.use(passport.session());
app.use("/images", express.static(path.join('images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
   next();
});

//Mongodb password sI2pOKBsTlYf4TEZ
// 5gKBz2127ytAD9S9

   app.use('/api/posts', postsRoutes);
   app.use('/api/user', userRoutes);
   app.use('/api/user/profile', userRoutes);


module.exports = app;