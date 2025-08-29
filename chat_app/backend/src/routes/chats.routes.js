const express = require("express");

const {
  createNewChat,
  getAllChats,
} = require("../controllers/chat.controllers.js");

const router = express.Router();

router.get("", getAllChats);

router.post("", createNewChat);

module.exports = router;
