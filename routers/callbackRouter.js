var express =require('express');
var callbackModel = require('../models/callme.js');
const appUtil=require('../appUtil.js')
const callbackCollection = appUtil.getProperties('devtest.db.customer.collection');
var router =express.Router();
router.use(function(req,res,next){
    console.log("routed to callback router");
    var name=req.body.name;
var email=req.body.email;
var mobile=req.body.mobile;
var message=req.body.message;
var mongoUtil=req.mongoUtil;
var callbackObject=new callbackModel({name:name,email:email,mobile:mobile,message:message});
var db=mongoUtil.getDb();
try{
    db.collection(callbackCollection).insertOne(callbackObject,function(err,res){
        if(err) throw err;
        console.log(callbackObject+" inserted into database");
    });
}
catch(error){
    console.log("Error:"+error);
}
res.json({msg:'success'});
});

module.exports=router;