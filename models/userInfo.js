var mongoose=require('mongoose');
//defining a schema
var Schema=mongoose.Schema;
var userInfoSchema = new Schema({
    fName : {type :String , required : [true,"Name required"], minLength:[1,"Name too short"] ,maxLength :[256,"Name too long"]},
    lName : {type :String , required : [true,"Name required"], minLength:[1,"Name too short"] ,maxLength :[256,"Name too long"]},
    gender : {type :String , required : [true,"Gender required"]},
    mobile : {type :String , required : [true,"Mobile number required"], minLength:[8,"Mobile number invalid"], maxLength:[14, "Mobile number invalid"]},
    email : {type :String , required : [true,"Email required"]},
    password : {type :String , required : true , maxLength:256},
    lastSeen : {type : Date, default : Date.now()},
    birthday : {type : Date,required : true},
    img:{
        data: Buffer,
        contentType: String
    }
},
{
    toJSON: {virtuals:true},
    toObject :{virtuals :true}
});
//Compiling model for schema
userInfoSchema.virtual('name').get(function(){
    return this.fName + this.lName;
})
var userInfoModel=mongoose.model('UserInfoModel',userInfoSchema);
module.exports=userInfoModel;