const crypto=require('crypto');
var propertiesReader=require('properties-reader');
var properties=propertiesReader('./properties.ini');
var hashSalt=properties.get('devtest.password.hash.salt');
var hashMethod=properties.get('devtest.password.hash.method');
var hashedPwd;
var utilFunctions = {
    hashFunction : function(password){
        hashedPwd = crypto.createHmac(hashMethod,hashSalt).update(password).digest('hex');
        return hashedPwd;
    },
    getProperties : function(propertyName){
        return properties.get(propertyName);
    },
    isEmpty : function(object){
        return Object.keys(object).length === 0
    }
}
module.exports=utilFunctions;