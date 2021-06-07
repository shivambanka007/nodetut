var express =require('express');
var path=require('path');
var router =express.Router();
var blogUtil=require('./blogUtil.js');

router.get('/', function(req, res, next) {
    blogUtil.fetchAllCustomerBlogs(req,(err,blogs)=>{
        if(blogs){
            
            res.render('callusdashboard',{ title: 'Contact-us Dashboard', layout: false ,blogs:blogs});
        }   
        else{
            res.render('callusdashboard',{ title: 'Contact-us Dashboard', layout: false ,blogs:null });
        }
       });
  });
  module.exports=router;