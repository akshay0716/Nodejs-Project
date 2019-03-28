const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');



// LOAD USER MODEL

const User = require("../../models/User");

// @routes Get api/users/test
// @desc   Tets users route
//@access  public route

router.get("/test", (req, res) => {
  res.json({
    msg: "User Works"
  });
});





// @routes Get api/users/register
// @desc   Register user
//@access  public route

router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "email already exist"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});





// @routes Get api/users/logn
// @desc   Login User / Returning JWT token
//@access  public route


router.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email 

  User.findOne({
      email
    })
    .then(user => {
      // Check for user
      if (!user) {
        return res.status(404).json({
          email: 'User not found'
        });
      }

      // Check for password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //User matched 

            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            } // Create jwt payload

            //Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey, {
                expiresIn: 3600
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.json({
              password: 'Password incorrect'
            });
          }
        });
    });
});



// @routes Get api/users/current
// @desc   return current user
//@access private route

router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});


module.exports = router;