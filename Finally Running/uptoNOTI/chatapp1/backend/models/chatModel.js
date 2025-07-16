const expressAsyncHandler = require('express-async-handler');
const mongoose = require('mongoose')

const chatModel = mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{
        //this will contain id to partcular user as single user store in databsae
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
//if new chat added timestamp is going to add
    {
        timestamps:true,
    }
);


const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;

