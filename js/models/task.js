// ===============================================
// ================ Dependancies =================
// ===============================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// ===============================================
// ================ Define Schema ================
// ===============================================
var taskSchema = new Schema({
	title: String,
	author: String,
	contents: [{body: String}],
	tag: String
});


// ===============================================
// ================ Export Model =================
// ===============================================
module.exports = mongoose.model('Task', taskSchema);