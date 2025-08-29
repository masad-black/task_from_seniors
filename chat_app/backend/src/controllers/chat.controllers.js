const prisma = require("../db/prisma.js");
const ApiResponse = require("../utils/api_response.js");

// todo: before the chat is created, send that to the room
async function createNewChat(message, username, roomId) {
  // const { message, username } = req.body;
  // const { roomId } = req.query;

  if (!roomId) {
    return res.json(new ApiResponse(401, "room id is missing"));
  }

  if (!message || !username) {
    return res.json(new ApiResponse(201, "some input data is missing"));
  }

  try {
    const newChat = await prisma.chat.create({
      data: {
        message,
        username,
      },
    });

    // adding the new chat id into the rooms chats array
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        chats: {
          push: newChat.id,
        },
      },
    });

    return newChat;
    // return res.json(new ApiResponse(200, null, null));
  } catch (error) {
    console.log("__error in creating chat record__: ", error);
    return res.json({
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function getAllChats(req, res) {
  try {
    const chats = await prisma.chat.findMany({});

    return res.json(new ApiResponse(200, "all chats records", chats));
  } catch (error) {
    console.log("__error in getting chat records__: ", error);
    return res.json({
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

module.exports = {
  createNewChat,
  getAllChats,
};
