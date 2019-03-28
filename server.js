const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();

// Body parser middleware

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// DB CONNECTION

const db = require('./config/keys').mongoURI;

// CONNECT TO MONGODB USING MONGOOSE

mongoose
  .connect(db)
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));


//Passport middleware

app.use(passport.initialize());

//Passprt config

require('./config/passport')(passport);


// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('server runing on port 5000')
});