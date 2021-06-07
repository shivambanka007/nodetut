const mongoose=require('mongoose');
const appUtil=require('./appUtil.js')
const dbUrl=appUtil.getProperties('devtest.db.url');
const dbName=appUtil.getProperties('devtest.db.name');
var _db;
var mongoUtil = {
    connectToServer: function(callback){
        mongoose.connect(dbUrl+dbName,{useNewUrlParser:true, useUnifiedTopology :true},function(err,client){
            _db=mongoose.connection;
            _db.on('error', console.error.bind(console, 'MongoDB connection error:'));
            return callback(err);
        });
    },
    getDb: function (){
        return _db;
    }
};
module.exports =mongoUtil