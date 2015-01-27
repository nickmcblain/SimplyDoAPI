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
	images: [{url: String}],
	contents: [{content: String}],
	tags: String,
	userID: String
});


// ===============================================
// ================ Export Model =================
// ===============================================
module.exports = mongoose.model('Task', taskSchema);