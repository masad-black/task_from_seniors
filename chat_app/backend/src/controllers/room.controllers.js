const prisma = require("../db/prisma.js");
const ApiResponse = require("../utils/api_response.js");

async function createNewRoom(req, res) {
  const { roomName } = req.body;

  if (!roomName) {
    return res.json(new ApiResponse(401, "room name is missing"));
  }

  //   todo: when the user create the room the user should be directly connected to this room
  try {
    const newRoom = await prisma.room.create({
      data: {
        name: roomName,
      },
    });

    return res.json(new ApiResponse(201, null, newRoom));
  } catch (error) {
    console.log("__error in creating room record__: ", error);
    return res.json({
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function getAllRooms(req, res) {
  try {
    const rooms = await prisma.room.findMany({});

    res.json(new ApiResponse(200, "all room records", rooms));
  } catch (error) {
    console.log("__error in getting all room records__: ", error);
    return res.json({
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function deleteRoom(req, res) {
  const { roomId } = req.params;

  if (!roomId) {
    return res.json(new ApiResponse(401, "room id not available"));
  }

  try {
    await prisma.room.delete({
      where: {
        id: roomId,
      },
    });

    return res.json(new ApiResponse(200, "room deleted"));
  } catch (error) {
    console.log("__error in deleting room record__: ", error);
    return res.json({
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function getRoomChats(req, res) {
  const { roomId } = req.params;

  try {
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    const chats = [];

    for (let chatId of room?.chats) {
      const chat = await prisma.chat.findUnique({
        where: {
          id: chatId,
        },
      });
      chats.push(chat);
    }

    return res.json(new ApiResponse(200, "room chats", chats));
  } catch (error) {
    console.log("__error in getting room chats__: ", error);
    return res.json({
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function getAllRoomsNames() {
  try {
    const names = await prisma.room.findMany({
      select: {
        name: true,
      },
    });

    return names;
  } catch (error) {
    console.log("__error in getting all room names__: ", error);
    return res.json({
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

module.exports = {
  createNewRoom,
  getAllRooms,
  deleteRoom,
  getRoomChats,
  getAllRoomsNames,
};
