const appUtil=require('../../appUtil.js');
const userModel=require('../../models/userInfo.js');
const userCollection = appUtil.getProperties('devtest.db.user.collection');
var loginUser = {
    checkUserExistandPassMatch : function (req,callback){
        var email=req.body.email;
        //Getting hash value of the password.
        var hashPassword=appUtil.hashFunction(req.body.password);
        //Getting DB connection
        var mongoUtil=req.mongoUtil;
        var db=mongoUtil.getDb();
        //Checking the db if user exists
        try {
            db.collection(userCollection).findOne({email:email,password:hashPassword},function(err,result){
                if(err) return err;
                if(result != null){
                    if(!appUtil.isEmpty(result) && result.email ==email && result.password==hashPassword){
                        // User exists
                        //Creating a session for the user
                            // Creating a user object firstly
                            userObj={email:email,password:hashPassword};
                            req.session.userId=email;
                            req.signedCookies.user=userObj;
                            req.signedCookies.email=email;
                            req.signedCookies.password=hashPassword;
                        callback(null,true);
                    }
                    else{
                        callback(null,false);
                    }
                }
                else {
                    callback(null,false);
                }
            });
        }
        catch(error){
            console.log(error);
        }
    }
}
module.exports=loginUser;