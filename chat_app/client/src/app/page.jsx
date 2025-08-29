"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const { getAllRooms, createNewRoom } = require("@/utils/api.js");
import useStore from "@/zustand/useStore.js";

export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");

  const updateSelectedRoom = useStore((state) => state.updateSelectedRoom);
  const updateUsername = useStore((state) => state.updateUsername);
  const username = useStore((state) => state.username);

  const router = useRouter();

  // Handle room creation
  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) {
      alert("enter the room name!!!");
      return;
    }

    const newRoom = await createNewRoom(newRoomName);
    setNewRoomName("");

    setRooms((rooms) => [...rooms, newRoom]);
  };

  function navigateToRoom(roomId) {
    if (!roomId) {
      alert("no room id");
      return;
    }

    if (!username) {
      alert("no username");
      return;
    }

    const room = rooms.filter((room) => room.id === roomId);
    updateSelectedRoom(room);

    router.push(`room/${roomId}`);
  }

  useEffect(() => {
    (async () => {
      const rooms = await getAllRooms();
      setRooms(rooms);
    })();
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Username input */}
      <div className="mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => updateUsername(e.target.value)}
          className="w-full p-3 rounded-xl border shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      {/* Create new room input */}
      <div className="flex w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="add new room"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          className="flex-1 p-3 rounded-l-xl border shadow-sm focus:outline-none focus:ring focus:ring-green-400"
        />
        <button
          onClick={handleCreateRoom}
          className="px-4 py-2 bg-green-500 text-white rounded-r-xl hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>

      {/* Rooms list */}
      <div className="flex flex-col gap-4 max-w-2xl">
        {rooms?.map((room) => (
          <li
            key={room?.id}
            className="bg-white shadow-md rounded-2xl p-4 flex flex-row items-center space-x-2 justify-between w-80"
          >
            <h2 className="text-sm font-semibold">{room?.name}</h2>
            <button
              className="bg-green-400 rounded-sm px-6 py-1 hover:cursor-pointer"
              onClick={() => navigateToRoom(room?.id)}
            >
              Join
            </button>
          </li>
        ))}
      </div>
    </main>
  );
}
