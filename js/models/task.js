var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
	title: String,
	author: String,
	contents: [{body: String}],
	tag: String
});

var Task = mongoose.model('Task', taskSchema);