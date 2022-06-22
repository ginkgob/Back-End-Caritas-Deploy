"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mongoose = require('mongoose');

require('dotenv').config();

var userRoutes = require('./routes/user');

var app = (0, _express["default"])();
app.listen(9000); //middleware

app.use(_express["default"].json());
app.use('/api', userRoutes); //routes

app.get('/', function (req, res) {
  res.send('Welcome to my API');
}); //connect to mongodb

mongoose.connect(process.env.MONGODB_URI).then(function () {
  return console.log('Connected to MongoDB Atlas');
})["catch"](function (error) {
  return console.error(error);
});
app.listen(port, function () {
  return console.log('server listening on port', port);
});