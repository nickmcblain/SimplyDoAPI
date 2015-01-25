// ===============================================
// ================ Dependancies =================
// ===============================================
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('./js/controllers/auth');

// Start the express application and apply dependancies
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Port selection
app.set('port', (process.env.PORT || 5000));


// ===============================================
// ============= Database Connection =============
// ===============================================
mongoose.connect(process.env.MONGOLAB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Database connection successful.')
});

var Task = require('./js/models/task');
var User = require('./js/models/user');


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

// ===============================================
// ================ Task Handling ================
// ===============================================
router.route('/tasks')
	.get(auth.isAuthenticated, function(req, res){
		Task.find(function(err, tasks){
			if(err)
				res.send(err);

			res.json(tasks);
		});
	})
	.post(auth.isAuthenticated, function(req, res){
		var task = new Task();

		task.title = req.body.title;
		task.author = req.body.author;
		task.contents = req.body.contents;
		task.tag = req.body.tag;

		task.save(function(err){
			if(err)
				res.send(err);

			res.send('Task added');
		});
	});

router.route('/tasks/:task_id')
	.get(auth.isAuthenticated, function(req, res){
		Task.find(req.params.task_id, function(err, task){
			if(err)
				res.send(err);

			res.json(task);
		});
	})
	.post(auth.isAuthenticated, function(req, res){
		var task = new Task();

		task.title = req.body.title;
		task.author = req.body.author;
		task.contents = req.body.contents;
		task.tag = req.body.tag;

		task.save(function(err){
			if(err)
				res.send(err);
		});
	})
	.delete(auth.isAuthenticated, function(req, res){
		Task.remove(req.params.task_id, function(err){
			if(err)
				res.send(err);

			res.send('Task deleted');
		});

	})


// ===============================================
// ================ User Handling ================
// ===============================================
router.route('/users')
	.post(function(req, res){
		var user = new User();

		user.username = req.body.username;
		user.password = req.body.password;

		user.save(function(err){
			if(err)
				return res.send(err);

			res.send('Created user');
		});
	})
	.get(function(req, res){
		User.find(function(err, users){
			if(err)
				return res.send(err);

			res.send(users);
		});
	})


// ===============================================
// =============== Specifiy Route ================
// ===============================================
app.use('/api', router);