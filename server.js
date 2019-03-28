const express = require('express');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// DB CONNECTION

const db = require('./config/keys').mongoURI;

// CONNECT TO MONGODB USING MONGOOSE

mongoose
  .connect(db)
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));


// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);





app.get('/', (req, res) => {
  res.send('hello akshay i am akshay')
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('server runing on port 5000')
});