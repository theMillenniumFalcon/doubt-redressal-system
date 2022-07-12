const mongoose = require('mongoose')

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
	creatorId: {
		type: String,
		default: ''
	}
})

const Doubt = mongoose.model("Doubt", DoubtSchema)
module.exports = Doubt