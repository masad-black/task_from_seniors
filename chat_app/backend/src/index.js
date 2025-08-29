const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");

require("dotenv").config();

const mainRouter = require("./routes");
const { createNewChat } = require("./controllers/chat.controllers.js");
const { getAllRoomsNames } = require("./controllers/room.controllers.js");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // allow frontend
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  },
});

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

async function getClientsInRoom(roomName) {
  const sockets = await io.in(roomName).fetchSockets();
  return sockets.length;
}

// sokcet
io.on("connection", (socket) => {
  console.log(`__ some user connected__`);
  console.log("__socket id__", socket.id);

  // creating room for each room
  socket.on("room", (data) => {
    // making a room for each room
    console.log("__data__", data);
    const { roomId, username } = data;

    socket.join(roomId);

    // Notify others in the room
    io.to(roomId).emit("userJoined", `${username} has joined the room`);
  });

  // listning for chat messages
  socket.on("chatMessage", ({ roomId, message, username }) => {
    console.log("_new message__", message);

    createNewChat(message, username, roomId)
      .then((newChat) => {
        // console.log("__new chat__", newChat);

        // Send to everyone in the room
        io.to(roomId).emit("chatMessage", newChat);
      })
      .catch((error) => {
        console.log("_error in creating new chat:socket__", error);
      });
  });

  // Leave room
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`${socket.id} left room ${roomId}`);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("", (req, res) => {
  res.send(`server running on port !!! ${process.env.PORT}`);
});

// main router
app.use("/api", mainRouter);

server.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
