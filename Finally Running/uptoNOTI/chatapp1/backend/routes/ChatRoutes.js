
const express = require("express");
const router = express.Router();
// const accessChat = require("../controllers/chatControllers"); // Ensure this points to the correct file
// const fetchChats = require("../controllers/chatControllers");
const { accessChat, fetchChats ,createGroupChat,renameGroup,removeFromGroup,addToGroup} = require("../controllers/chatControllers")
const protect = require("../middlewares/authMiddleware"); // Ensure this points to the correct file

//protect middleware to authorize whether logged in user have acces of this route by matching bearer token
router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect,createGroupChat)
router.route("/rename").put(protect,renameGroup)
router.route("/groupremove").put(protect,removeFromGroup);
router.route("/groupadd").put(protect,addToGroup);

module.exports = router;
