const appUtil = require('../../appUtil.js');
const userModel = require('../../models/userInfo.js');
const userCollection = appUtil.getProperties('devtest.db.user.collection');
var profileUser = {
  retrieveUserDetails: function (req, callback) {
    var email = req.body.userId;
    console.log('Email sent by axios is :' + email);
    //Getting DB connection
    var mongoUtil = req.mongoUtil;
    var db = mongoUtil.getDb();
    try {
      db.collection(userCollection).findOne(
        { email: email },
        function (err, result) {
          if (err) return err;
          if (result != null) {
            if (!appUtil.isEmpty(result) && result.email == email) {
              console.log('Result retrieved is :' + result.email);
              callback(null, result);
            } else {
              //cannot happen as user is logged in
              //But if it happens, handle it
              callback(null, false);
            }
          } else {
            callback(null, false);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = profileUser;
