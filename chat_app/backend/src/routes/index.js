const express = require("express");

const roomRoutes = require("./room.routes.js");
const chatRoutes = require("./chats.routes.js");

const router = express.Router();

router.use("/rooms", roomRoutes);
router.use("/chats", chatRoutes);

module.exports = router;
