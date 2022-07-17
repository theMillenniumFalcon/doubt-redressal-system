require('dotenv').config()
const express = require('express')
const socket = require("socket.io")
const connectDB = require('./db/db')
const authRoute = require('./routes/auth')
const doubtRoute = require('./routes/doubt')
const commentRoute = require('./routes/comment')
const answerRoute = require('./routes/answer')
const userRoute = require('./routes/user')
const messageRoute = require('./routes/message')
const errorHandler = require('./middleware/error')
const { checkUser } = require('./middleware/checkUser')
const cors = require("cors")
const { PORT } = require('./config/config')
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
}

const main = async () => {
    connectDB()
    const app = express()
    app.use(express.json())
    app.use(cors(corsOptions))

    app.get('/', checkUser)

    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    app.use('/api/doubt', doubtRoute)
    app.use('/api/doubtComments', commentRoute)
    app.use('/api/doubtAnswer', answerRoute)
    app.use("/api/messages", messageRoute)

    app.use(errorHandler)

    const server = app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })

    const io = socket(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        },
    })

    global.onlineUsers = new Map()
    io.on("connection", (socket) => {
        global.chatSocket = socket
        socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id)
        })

        socket.on("send-msg", (data) => {
            const sendUserSocket = onlineUsers.get(data.to)
            if (sendUserSocket) {
                socket.to(sendUserSocket).emit("msg-recieve", data.msg)
            }
        })
    })

    process.on('unhandledRejection', (err, promise) => {
        console.log(`Logged Error: ${err}`)
        server.close(() => process.exit(1))
    })
}
main().catch((error) => {
    console.error(error)
})