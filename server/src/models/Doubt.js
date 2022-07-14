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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    },
	creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Doubt = mongoose.model("Doubt", DoubtSchema)
module.exports = Doubt