const Doubt = require('../models/Doubt')
const Comment = require('../models/Comment')

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

const listAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find().populate('userId')
        res.status(200).json({ success: true, comments })
        next()
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const listComments = async (req, res, next) => {
    try {
        const doubtId = req.params.id
        const doubtComments = await Comment.find({doubtId: doubtId}).populate('userId')
        res.status(200).json({ success: true, doubtComments })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = {
    createComment, listComments, listAllComments
}