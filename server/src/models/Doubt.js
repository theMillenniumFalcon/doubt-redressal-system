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
	comments: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Comment' 
	}],
	answer: {
		type: String,
		default: ""
	},
	creatorId: {
		type: String,
		required: [true, 'Some problem occured while raising doubt']
	}
}, { timestamps: true })

const Doubt = mongoose.model("Doubt", DoubtSchema)
module.exports = Doubt