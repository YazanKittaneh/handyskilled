const express = require('express');
const router = express.Router();
const User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET homeowner page. */
router.get('/homeowner', function(req, res, next) {
  res.render('homeowner');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  console.log("req.body:", req.body);
  
  const username = req.body.username;
  // const email = req.body.email;
  User.findOne({username}, "username").then(user => {
      if(user) {
          return res.status(401).send({ message: "Account with this username already exists" });
      } else {
          const user = new User(req.body);
          // SendGrid.sendWelcomeEmail(user);
          user.save().then((user) => {
              const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
              // set the cookie when someone signs up and logs in
              res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
              res.redirect("/dashboard");
          }).catch(err => {
              console.log(err.message);
              return res.status(400).send({ err: err });
          });
      } // end else
  }).catch((err) => {
      console.log(err);
  });
});

module.exports = router;