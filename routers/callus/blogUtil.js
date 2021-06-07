const appUtil=require('../../appUtil.js');
const userModel=require('../../models/callme.js');
const blogCollection = appUtil.getProperties('devtest.db.customer.collection');
var blogDetails = {
    fetchAllCustomerBlogs : function (req,callback){
        //Getting DB connection
        var mongoUtil=req.mongoUtil;
        var db=mongoUtil.getDb();
        try{
            db.collection(blogCollection).find({}).toArray(function(err,result){
                if(err) throw err;
                console.log("Result is:"+JSON.stringify(result));
                if(result != null){
                    if(!appUtil.isEmpty(result)){
                        callback(null,result);
                    }
                    else{
                        callback(null,false);
                    }
                }
                else{
                    callback(null,false);
                }
            })
        }
        catch(error){
            console.log(error);
        }
    }
};
module.exports=blogDetails;