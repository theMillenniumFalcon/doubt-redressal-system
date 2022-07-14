const Doubt = require('../models/Doubt')
const Comment = require('../models/Comment')
const mongoose = require('mongoose')

const createComment = async (req, res, next) => {
    try {
        const doubtId = req.params.id
        const commentBody = new Comment({
            comment: req.body.comment,
            doubtId: doubtId,
            userId: req.user._id
        })
        
        const comment = await commentBody.save()

        await Doubt.updateOne(
            {_id: doubtId},
            {
                $push: {
                    comments: comment._id
                }
            }
        )
    
        res.status(200).json({ success: true, comment })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const listComments = async (req, res, next) => {
    try {
        const doubtId = req.params.id

        let query=[
			{
				$lookup:
				{
				 from: "users",
				 localField: "userId",
				 foreignField: "_id",
				 as: "user"
				}
			},
			{$unwind: '$user'},
            {
                $match: {
                    'doubtId': mongoose.Types.ObjectId(doubtId)
                }
            }
		]
        let comments = await Doubt.aggregate(query)
        res.status(200).json({ success: true, comments })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = {
    createComment, listComments
}