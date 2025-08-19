import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "html/index.html"));
});

io.on("connection", (socket) => {
  console.log("__connected___");

  io.emit("welcome", "welcome to my chat app!!");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("message", (msg) => {
    console.log("__hello___");

    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("__logout___");

    socket.broadcast.emit("disconnected", {
      message: `A user has left the chat`,
    });
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server listning on port: ${process.env.PORT} `);
});
