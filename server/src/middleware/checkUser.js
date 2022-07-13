const JWT = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

const checkUser = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token) {
        res.locals.user = null
        return next(new ErrorResponse("Not authorized to access this route!", 401))
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if(!user) {
            return next(new ErrorResponse("No user found with this id", 404))
        }

        res.send(user)
        next()
    } catch (error) {
        res.locals.user = null
        return next(new ErrorResponse("Not authorized to access this route!", 401))
    }
}

module.exports = {
    checkUser
}