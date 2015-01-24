// ===============================================
// ================ Dependancies =================
// ===============================================
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

// Start the express application and apply dependancies
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Port selection
app.set('port', (process.env.PORT || 5000))


// ===============================================
// ============= Database Connection =============
// ===============================================
mongoose.connect('mongodb://heroku_app33442719:97eb3j95dp0v6fcl7k7lvgtaf0@ds037451.mongolab.com:37451/heroku_app33442719');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Database connection successful.')
});
var Task = require('/models/task');


// ===============================================
// ================ Open API port ================
// ===============================================
app.listen(app.get('port'), function() {
  console.log('API is running on ' + app.get('port'))
});


// ===============================================
// =============== Handle Requests ===============
// ===============================================
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'API connection made.' });  
});

router.use(function(req, res, next) {
    console.log('Request made');
    next();
});

router.route('/tasks')
	.get(function(req, res){
		Task.find(function(err, tasks){
			if(err)
				res.send(err);

			res.json(tasks);
		});
	})
	.post(function(req, res){
		var task = new Task();

		var title = req.body.title;

		task.save(function(err){
			if(err)
				res.send(err);
		});
	})

app.use('/api', router);