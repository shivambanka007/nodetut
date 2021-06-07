var express =require('express');
var path=require('path');
var signupUtil=require('./signupUtil.js');
var router =express.Router();
router.use(function(req,res,next){
    next();
});
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Signup Page', layout: false });
  });
router.post('/post',function(req,res,next){
    signupUtil.createUserIfNotExist(req,(err,isUserCreated)=>{
            if(isUserCreated==false){
                res.redirect('/signup');
            }
            else{
                req.session.error=null;
                req.session.success = "Account created. Try logging in.."
                res.redirect('/home');
            }
    })
});
module.exports=router;