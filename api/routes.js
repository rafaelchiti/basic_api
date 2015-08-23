var _ = require('lodash');
var jwt = require('jsonwebtoken');


module.exports = function(app) {

  app.post('/authenticate', function(req, res, next) {

    if (req.body.email && req.body.password) {
      //TODO validate req.body.username and req.body.password
      //if is invalid, return 401
      if (req.body.email.indexOf(' ') !== -1 || req.body.password.indexOf(' ') !== -1 ) {
        var message = 'Username and Password cannot contain spaces';
        res.send(401, [{message: message}]);
      }

      // var eValidator = emailValidator.validate(req.body.email);
      var valid = true;

      if(valid){
        _authenticate(req, res, next);
      } else {
        res.send(422, "Error validating email");
      }


    } else {
      var message = 'Username and Password are both mandatory fields';
      res.send(401, [{message: message}]);
    }

  });

};

var _authenticate =   function(req, res, next) {

    var token = jwt.sign({userId: user._id}, 'some-secret', { expiresInMinutes: 60*5 });
    //Retriving token and full name for displaying purposes
    res.json({token: token});

    // //Validating user
    // User.findOne({username: req.body.username}, function(err, user) {

    //   if (err) next(err);

    //   if (_.isNull(user)){
    //     return res.send(404, [{message:'Authentication failed, double check your credentials'}]);
    //   }

    //   //Validating credentials
    //   if (user.password != req.body.password) {
    //     res.statusCode = 401;
    //     res.send([{message: 'Authentication failed, double check your credentials'}]);
    //   }

    //   // Creating the Token
    //   var token = jwt.sign({userId: user._id}, 'toptal-jogging', { expiresInMinutes: 60*5 });

    //   //Retriving token and full name for displaying purposes
    //   res.json({ fullname: user.fullname, token: token });

    // });
  };