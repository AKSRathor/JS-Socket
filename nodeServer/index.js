//node server which will handle socket io connections
const io = require("socket.io")(8000,{
    cors:{
        origin:"*"
    }
})
const users= {}
io.on('connection', socket =>{
    // console.log(socket)
    socket.on('New-user-joined', name=>{
        // console.log(socket.id)
        users[socket.id] = name
        console.log("new user", name)
        socket.broadcast.emit('user-hasBeen-joined', name)
    })
    socket.on('send', message =>{
        console.log("in the send")
        socket.broadcast.emit('receive', {message:message, name:users[socket.id]})
    })
    socket.on('disconnect', message =>{
        console.log("in the send")
        socket.broadcast.emit('left', {message:message, name:users[socket.id]})
        delete users[socket.id]
    })
})