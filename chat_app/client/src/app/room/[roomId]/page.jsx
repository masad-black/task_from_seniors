"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import useStore from "@/zustand/useStore.js";
import { getRoomChats } from "@/utils/api.js";

// create socket outside component so it's not recreated each render
const socket = io("http://localhost:8000/");

export default function ChatPage() {
  const [newMessage, setNewMessage] = useState("");
  const [roomChats, setRoomChats] = useState([]);
  const [join, setJoin] = useState("");

  const selectedRoom = useStore((state) => state.selectedRoom);
  const username = useStore((state) => state.username);

  const connectedUsers = 5;

  useEffect(() => {
    const roomID = window.location.href.split("/").at(4);

    // Join the room
    socket.emit("room", { roomID, username });

    // Fetch initial chats
    (async () => {
      const chats = await getRoomChats(roomID);
      setRoomChats(chats);
    })();

    // Listen for new chat messages
    const handleNewChat = (newChat) => {
      console.log("__new chat__", newChat);
      setRoomChats((chats) => [...chats, newChat]);
    };

    socket.on("chatMessage", handleNewChat);

    // Listen for join messages
    const handleUserJoin = (joinMessage) => {
      console.log("__join message__", joinMessage);
      setJoin(joinMessage);
    };
    socket.on("userJoined", handleUserJoin);

    // Cleanup on unmount
    return () => {
      socket.off("chatMessage", handleNewChat);
      socket.off("userJoined", handleUserJoin);
    };
  }, [username, selectedRoom?.id, newMessage]); // re-run if room/user changes

  const handleSend = () => {
    const roomId = window.location.href.split("/").at(4);

    const data = {
      message: newMessage,
      username,
      roomId,
    };

    console.log("__message struct__", data);

    setNewMessage("");
    socket.emit("chatMessage", data);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">{selectedRoom?.name}</h1>
        <span className="text-gray-600">{connectedUsers} users connected</span>
      </header>

      {/* Chat content */}
      <div className="flex-1 flex">
        <div className="w-full bg-stone-700 border-l flex flex-col overflow-auto h-[90vh]">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {roomChats?.map((msg) => {
              const time = new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl shadow-sm max-w-xs ${
                    msg.user === "You"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold">{msg.username}</p>
                    <span className="text-xs text-gray-400">{time}</span>
                  </div>
                  <p>{msg.message}</p>
                </div>
              );
            })}
            <div className="w-full flex items-center justify-center">
              <p>{join}</p>
            </div>
          </div>

          {/* Message input */}
          <div className="p-4 border-t bg-white flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-3 rounded-xl border shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
