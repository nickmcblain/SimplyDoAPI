var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
	title: String,
	author: String,
	contents: [{body: String}],
	tag: String
});

module.exports = mongoose.model('Task', taskSchema);