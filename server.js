// Include all dependancies
var express = require('express');
var mongoose = require('mongoose');

// Start the express application and connect to database
var app = express();
mongoose.connect('mongodb://heroku_app33442719:97eb3j95dp0v6fcl7k7lvgtaf0@ds037451.mongolab.com:37451/heroku_app33442719');

// Port selection
app.set('port', (process.env.PORT || 5000))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  
});

app.get('/', function(request, response) {
  
});

app.listen(app.get('port'), function() {
  console.log("API is running on " + app.get('port'))
})