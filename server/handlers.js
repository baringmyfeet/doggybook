var request = require('request');

var db = require('../app/config');
var jwt = require('jwt-simple');


var User = require('../app/models/user');
var Dog = require('../app/models/dog');
var Walker = require('../app/models/walker');

var Users = require('../app/collections/users');
var Dogs = require('../app/collections/dogs');
var Walkers = require('../app/collections/walkers');


exports.signin = function(req, res) {
  console.log(req.body);

  var username = req.body.username;
  var password = req.body.password;

  // search the db for a particular username
  new User({username: username})
  .fetch()
  .then(function(user) {
    if (!user) {
      // if !found, redirect to sign in
      console.log('user not found, redirecting to landing page or sign in page');
      res.redirect('/signin');
    } else {
      // if found: hash the pw attempt against the stored pw
      user.comparePassword(password, function(match) {
        if (match) {
          // if matched, redirect to landing page/dashboard and authenticate
          console.log('authenticate user + start a session');
          res.redirect('/');

        } else {
          // if mismatched, send back to login page
          console.log('wrong password, redirecting to landing page or sign in page');
          res.redirect('/signin');
        }
      });
    }
  });
}

exports.signup = function(req, res) {
  // we'll be given some obj with data to be parsed and entered into the db.
  console.log(req.body);

  var username = req.body.username;
  var password = req.body.password;

  new User({username: username})
  .fetch()
  .then(function(user) {
    // check if the provided username exists in the db
    // if found: send back an error
    if (user) {
      console.log("username already exists");
      res.redirect('/signup');
    }
    // otherwise create a new user
    else {
      new User({
        //create a new knex/backbone model and insert into the db

      });
      new Dog({

      });

      new Walker({

      });
      // if !found: register the user into TWO tables,
      // the general user table and the dog/walker table
      // the user table will take a hashed version of the desired pw.
    }
  });
}
