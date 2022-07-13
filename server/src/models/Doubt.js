const mongoose = require('mongoose')
const User = require('./User')

const DoubtSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'A doubt must have a title'],
	},
	description: {
		type: String,
		required: [true, 'A doubt must have a description'],
	},
	commments: {
		type: Array,
		default: []
	},
	creator : { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	},
	createdAt: Date
})

const Doubt = mongoose.model("Doubt", DoubtSchema)
module.exports = Doubt