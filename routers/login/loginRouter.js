var express = require('express');
var path = require('path');
var loginUtil = require('./loginUtil.js');
var router = express.Router();
const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/home');
  } else {
    next();
  }
};
router.use(function (req, res, next) {
  console.log('Inside the login router');
  next();
});
router.get('/', redirectHome, function (req, res, next) {
  res.render('signup', { title: 'Login Page', layout: false });
});
router.post('/post', redirectHome, function (req, res, next) {
  loginUtil.checkUserExistandPassMatch(req, (err, userData) => {
    if (userData) {
      req.session.error = null;
      res.json({
        msg: 'Success',
        sessionKey: req.body.email,
        userData: userData,
      });
    } else {
      req.session.error = 'Username/Password incorrect';
      req.session.save();
      res.json({ msg: 'Failed' });
    }
  });
});
module.exports = router;
