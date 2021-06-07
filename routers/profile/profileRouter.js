var express =require('express');
var path=require('path');
var profileUtil=require('./profileUtil.js');
var router =express.Router();
const redirectLogin =(req,res,next)=>{
  if(!req.session.userId){
      res.redirect("/login");
  }
  else{ 
    next();}
}
router.use(function(req,res,next){
    console.log("Inside the profile router");
    next();
});
router.get('/',redirectLogin, function(req, res, next) {
    //We need to fetch user details from user collection
    profileUtil.retrieveUserDetails(req,(err,userDetails)=>{
        console.log("Details Retrieved:"+userDetails);
        if(userDetails){
            res.render('profile', { title: 'Profile Page', layout: false , user:userDetails });
        }
        else{
            res.render('profile', { title: 'Profile Page', layout: false ,user:null});
        }
    });
  });
module.exports=router;