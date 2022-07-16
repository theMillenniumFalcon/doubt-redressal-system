const User = require('../models/User')

const listAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: {
            $ne: req.params.id
        }})
        res.status(200).json({ success: true, users })
        next()
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = {
    getUser, listAllUsers
}