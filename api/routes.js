var _ = require('lodash');
var jwt = require('jsonwebtoken');
var users = require("./constants/users");

module.exports = function(app) {

  app.post('/authenticate', function(req, res, next) {

    if (req.body.email && req.body.password) {

      if (req.body.email.indexOf(' ') !== -1 || req.body.password.indexOf(' ') !== -1 ) {
        var message = 'Username and Password cannot contain spaces';
        res.status(401).send({errorMessage: message});
      }

      var valid = true;

      if(valid){
        _authenticate(req, res, next);
      } else {
        res.status(422).send({errorMessage: "Error validating email"});
      }

    } else {
      var message = 'Username and Password are both mandatory fields';
      res.status(401).send({errorMessage: message});
    }

  });
};

function _authenticate (req, res, next) {

  var user = _.findWhere(users, {email: req.body.email});

  if (!user){
    return res.status(404).send({errorMessage: 'User not found with the given email'});
  }

  //Validating credentials
  if (user.password != req.body.password) {
    res.status(401).send({errorMessage: 'Authentication failed, wrong password'});
  }

  var token = jwt.sign({userId: user._id}, 'some-secret', { expiresInMinutes: 60*5 });

  // Retrieve the user and the token
  res.status(200).send({user: user, token: token});
  res.end();
};

