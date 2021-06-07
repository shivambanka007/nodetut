var mongoose=require('mongoose');
//defining a schema
var Schema=mongoose.Schema;
var callbackSchema = new Schema({
    name : {type :String , required : [true,"Name required"], minLength:[1,"Name too short"] ,maxLength :[256,"Name too long"]},
    mobile : {type :String , required : [true,"Mobile number required"], minLength:[8,"Mobile number invalid"], maxLength:[14, "Mobile number invalid"]},
    email : {type :String , required : [true,"Email required"]},
    message : {type :String , required : true , maxLength: [256,"Message must be less than 256 character"]},
    lastSeen : {type : Date, default : Date.now()}
});
//Compiling model for schema
var callbackModel=mongoose.model('CallbackModel',callbackSchema);
module.exports=callbackModel;