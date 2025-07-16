const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const cors = require('cors');
const connectDB = require("./config/db")
// const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const  ChatRoutes  =require("./routes/ChatRoutes")
const messageRoutes=require("./routes/messageRoutes");


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
    res.send("API is running Succesfully"); //to accept json file
})


app.get('/api/chat/:id',(req, res) => {
    //console.log(req.params.id);
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat)
})

app.use('/api/user', userRoutes)
app.use('/api/chat',ChatRoutes)
app.use('/api/message',messageRoutes)

app.use(notFound)
app.use(errorHandler)

//i dont want to make it public that our port is on 5000
const PORT = process.env.PORT || 5000;

const server=app.listen(PORT, console.log(`Server started on port ${PORT}`));

//the time it will wait while being inactive
const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    },
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io", socket.id);
    socket.on('setup',(userData)=>{
       // console.log("User setup data received:", userData);
       //create room for that particular exclusive user
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit('connected')
    })

    //when we click on chat it should make room with curren user and when other user joins it is going to add other user in this room
    socket.on('join chat',(room)=>{
        if (!room) {
            console.error('Room ID is invalid:', room);
            return;
        }
        socket.join(room);
        console.log('user Joined room'+room);
    })

    socket.on("typing",(room)=>socket.in(room).emit("typing"))
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))



    socket.on('new message',(newMessageRecieved)=>{
        console.log("Inside back");
        var chat=newMessageRecieved.chat;

        if(!chat.users) return console.log('chat.users not defined')
        //emit message to all except me it shouldn't recwive
        chat.users.forEach(user=>{
            if(user._id==newMessageRecieved.sender._id) return;
           // socket.broadcast.emit("message received",newMessageRecieved);
            socket.in(user._id).emit("message received",newMessageRecieved);
        })

    })

})

//socket .join make a new room with id of that which is valid for that user only
//cors so no cross origin error
//ping timeout how much time wait inactive 60s