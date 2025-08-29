const express = require("express");

const {
  getAllRooms,
  createNewRoom,
  deleteRoom,
  getRoomChats,
} = require("../controllers/room.controllers.js");

const router = express.Router();

router.get("", getAllRooms);
router.get("/:roomId/chats", getRoomChats);

router.post("", createNewRoom);

router.delete("/:roomId", deleteRoom);

module.exports = router;
