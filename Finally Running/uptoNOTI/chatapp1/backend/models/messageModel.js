const mongoose = require('mongoose')


const messageModel = mongoose.Schema({
     sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
     content: { type: String, trim: true },
     chat: { type: mongoose.Schema.Types.ObjectId,  ref: "Chat" },    
},
    {
      timestamps:true,
    }
);

const Message = mongoose.model("Message", messageModel);
module.exports = Message;











//chat Field in messageModel – What Does It Represent?
// chat field jo hai, wo us chat ka reference hai jisme ye message bheja gaya hai.
// Yeh pehle se existing chat document ka ObjectId store karta hai.


// reactions: [
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // User who reacted
//     emoji: { type: String } // Reaction emoji (e.g., "👍", "❤️", "😂")
//   }
// ]