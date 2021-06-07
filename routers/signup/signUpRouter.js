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
            console.log("isUserCreated:"+isUserCreated);
            if(isUserCreated==false){
                req.session.error=true;
                req.session.email=req.body.email;
                req.session.password=req.body.password;
                req.session.save();
                res.redirect('/signup');
            }
            else{
                req.session.error=null;
                req.session.success = "Account created. Try logging in.."
                req.session.userId=req.body.email;
                req.session.save();
                console.log("Account created.. Trying to log in");
                res.redirect('/home');
            }
    })
});
module.exports=router;