// ===============================================
// ================ Dependancies =================
// ===============================================
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

// Start the express application and apply dependancies
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Port selection
app.set('port', (process.env.PORT || 5000))


// ===============================================
// ============= Database Connection =============
// ===============================================
var config = require('/js/config');
mongoose.connect(config.getURI);

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

		task.title = req.body.title;
		task.author = req.body.author;
		task.contents = req.body.contents;
		task.tag = req.body.tag;

		task.save(function(err){
			if(err)
				res.send(err);
		});
	});

router.route('/tasks/:task_id')
	.get(function(req, res){
		Task.find(req.params.task_id, function(err, task){
			if(err)
				res.send(err);

			res.json(task);
		});
	})
	.post(function(req, res){
		var task = new Task();

		task.title = req.body.title;
		task.author = req.body.author;
		task.contents = req.body.contents;
		task.tag = req.body.tag;

		task.save(function(err){
			if(err)
				res.send(err);
		});
	});

app.use('/api', router);