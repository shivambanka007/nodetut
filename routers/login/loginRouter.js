var express =require('express');
var path=require('path');
var loginUtil=require('./loginUtil.js');
var router =express.Router();
const redirectHome =(req,res,next)=>{
  if(req.session.userId){
      console.log("Session user exists")
      res.redirect("/home");
  }
  else{ console.log("No session user exists");
    next();}
}
router.use(function(req,res,next){
    console.log("Inside the login router");
    next();
});
router.get('/',redirectHome, function(req, res, next) {
    res.render('login', { title: 'Login Page', layout: false });
  });
router.post('/post',redirectHome,function(req,res,next){
   loginUtil.checkUserExistandPassMatch(req,(err,userExists)=>{
    if(userExists){
      req.session.error=null;
      res.redirect('/home');
    }
    else{
      req.session.error="Username/Password incorrect";
      res.redirect('/login');
    }
   });
});
module.exports=router;