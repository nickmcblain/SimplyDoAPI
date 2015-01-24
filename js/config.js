// ===============================================
// ================ Dependancies =================
// ===============================================
var mongoose = require('mongoose');


// ===============================================
// ============= Database Connection =============
// ===============================================
mongoose.connect('mongodb://heroku_app33442719:97eb3j95dp0v6fcl7k7lvgtaf0@ds037451.mongolab.com:37451/heroku_app33442719');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Database connection successful.')
});