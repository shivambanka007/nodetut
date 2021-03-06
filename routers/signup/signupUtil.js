const appUtil = require('../../appUtil.js');
const userModel = require('../../models/userInfo.js');
const userCollection = appUtil.getProperties('devtest.db.user.collection');
var createUser = {
  createUserIfNotExist: function (req, callback) {
    var email = req.body.email;
    //check if user exist
    //Getting DB connection
    var mongoUtil = req.mongoUtil;
    var db = mongoUtil.getDb();
    //Fetching the user
    try {
      db.collection(userCollection).findOne(
        { email: email },
        function (err, result) {
          if (err) return err;
          if (result != null) {
            if (!appUtil.isEmpty(result)) {
              // User exists
              req.session.error = 'User exists.Please try login';
              callback(null, false);
            }
          } else {
            //user does not exist
            console.log(req.body);
            var fName = appUtil.capitalize(req.body.fName);
            var lName = appUtil.capitalize(req.body.lName);
            var gender = req.body.gender;
            var bday = req.body.birthday;
            console.log('Birthday is:' + bday);
            var mobile = req.body.mobile;
            var password = appUtil.hashFunction(req.body.password);
            var mongoUtil = req.mongoUtil;
            var signupObject = new userModel({
              fName: fName,
              lName: lName,
              gender: gender,
              bday: bday,
              email: email,
              mobile: mobile,
              password: password,
            });
            var db = mongoUtil.getDb();
            try {
              db.collection(userCollection).insertOne(
                signupObject,
                function (err, res) {
                  if (err) return callback(err);
                }
              );
              callback(null, true);
            } catch (error) {
              res.session.error = 'Some error occured. Try again';
              callback(null, false);
              console.log('Error:' + error);
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = createUser;
