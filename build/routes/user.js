"use strict";

var express = require('express');

var userSchema = require('../models/user');

var router = express.Router(); //create user

router.post('/users', function (req, res) {
  var user = userSchema(req.body);
  user.save().then(function (data) {
    return res.json(data);
  })["catch"](function (error) {
    return res.json({
      message: error
    });
  });
}); // get all users

router.get('/users', function (req, res) {
  userSchema.find().then(function (data) {
    return res.json(data);
  })["catch"](function (error) {
    return res.json({
      message: error
    });
  });
}); // get a user

router.get('/users/:id', function (req, res) {
  var id = req.params.id;
  userSchema.findById(id).then(function (data) {
    return res.json(data);
  })["catch"](function (error) {
    return res.json({
      message: error
    });
  });
}); // update a user

router.put('/users/:id', function (req, res) {
  var id = req.params.id;
  var _req$body = req.body,
      name = _req$body.name,
      age = _req$body.age,
      email = _req$body.email;
  userSchema.updateOne({
    _id: id
  }, {
    $set: {
      name: name,
      age: age,
      email: email
    }
  }).then(function (data) {
    return res.json(data);
  })["catch"](function (error) {
    return res.json({
      message: error
    });
  });
}); // delete a user

router["delete"]('/users/:id', function (req, res) {
  var id = req.params.id;
  userSchema.updateOne({
    _id: id
  }).then(function (data) {
    return res.json(data);
  })["catch"](function (error) {
    return res.json({
      message: error
    });
  });
});
module.exports = router;