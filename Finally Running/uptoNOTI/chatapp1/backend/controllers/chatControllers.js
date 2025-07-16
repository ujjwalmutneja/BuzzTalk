const asyncHandler=require("express-async-handler")
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const axios = require('axios');


//creating ore fetching one to one chat  basically what happens is if there is old chat between two users(if in users array in any document both sender and user login id are present ) then it will fetch that chat
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.status(400).send({ message: "UserId parameter is required" });
    }

    // Check if chat already exists
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
        //current user logged in and the user id that we are provided with
        //see req contain logged in user so req.user id means logged in user
       // req.user._id → Refers to the MongoDB ObjectId of that logged-in user.
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
        //populate with all info except password
        //populate user array just remove password
    }).populate("users", "-password").populate("latestMessage");        //issa sender ki sirf id aa rhi baki sara latest document chhe aa rha ki content chat kya ha
   
    //popultae sender field
    isChat = await User.populate(isChat, {   //through this sender ki full details aa rhi
        path: "latestMessage.sender",
        select: "name pic email",
    });

    //one chat can exists once only in mychat section soischat[0]
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        // Create new chat
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            //user logged in and user with which we are trying to create chat
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users", "-password"
            );
            //populate user array above

        res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message );
        }
    }
});



 // Fetch all chats where this user is involved  basically myc chats
const fetchChats = asyncHandler(async (req, res) => {
    try {
       
        //as req contain login user
        let chats=Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")         // Populate users field excluding passwords
            .populate("groupAdmin", "-password")    // Populate groupAdmin field (if applicable)
            .populate("latestMessage")              // Populate latestMessage field
            .sort({ updatedAt: -1 });               // Sort by most recent

        // Populate the sender in the latestMessage
        chats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name pic email",
        });
        res.status(200).send(chats);
        // Send the chats document as the response
    } catch (error) {
        console.error("Error fetching chats:", error); // Log the error for debugging
        res.status(400).send({ message: error.message });

    }
    });
      


const createGroupChat=asyncHandler(async(req,res)=>{
    if(!req.body.users||!req.body.name){
        return res.status(400).send({message: "please fill all fields"});
    }
    //from frontend details will go in stringify format in backend it will parse to amke object
    var users=JSON.parse(req.body.users);

    if(users.length < 2){
        return res
        .status(400)
        .send("More than 2 users are required ")
    }

    //pushing currentlu login user as well
    users.push(req.user);
    try{
        const groupChat=await Chat.create({
            chatName:req.body.name,
            // this is array
            users:users,
            isGroupChat:true,
            groupAdmin:req.user
        });

        const fullGroupChat=await Chat.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        res.status(200).json(fullGroupChat);
        }catch(error){
        res.status(400);
        throw new Error(error.message);
    }

})

const renameGroup=asyncHandler(async(req,res)=>{
    const { chatId,chatName }=req.body;

    const updatedChat=await Chat.findByIdAndUpdate(
        chatId,
        {
            //if key value same like below we can write chatName
            chatName:chatName,
        },
        {
            new:true,
        }
    )
        .populate("users","-password")
        .populate("groupAdmin","-password");

        if(!updatedChat){
            res.status(404);
            throw new Error("chat not found")
        }
        else{
            res.json(updatedChat);
        }
});


/////////////Haan, $push MongoDB ka ek update operator hai jo kisi array field me naya element insert karne ke liye use hota hai. Agar array exist karta hai, toh woh usme naya value add kar dega.
const addToGroup=asyncHandler( async(req,res)=>{
    const { chatId,userId } =req.body;

    const added=await Chat.findByIdAndUpdate(chatId,{
        $push:{users:userId},
    },
    {new:true}
 )
  .populate("users","-password")
  .populate("groupAdmin","-password")

  if(!added){
    res.status(404);
    throw new Error("Chat Not Found")
  }
  else{
    res.json(added);
  }


});

const removeFromGroup=asyncHandler(async (req,res)=>{
    const {chatId,userId}=req.body;

    const removed=await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull:{users:userId}
        },
        {new:true}
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!removed){
        res.status(404);
        throw new Error("Chat Not Found")
    }
    else{
        res.json(removed);
    }

})


module.exports = { accessChat, fetchChats ,createGroupChat, renameGroup,addToGroup,removeFromGroup};
//module.exports = { accessChat, fetchChats};

