import axios from "axios";

const BASE_URL = "http://localhost:8000";

async function getAllRooms() {
  try {
    const res = await axios.get(`${BASE_URL}/api/rooms`);
    return res.data.data;
  } catch (error) {
    console.log("_error in getting rooms record__", error);
  }
}

async function createNewRoom(roomName) {
  try {
    const res = await axios.post(`${BASE_URL}/api/rooms`, { roomName });

    return res.data.data;
  } catch (error) {
    console.log("_error in creating new room record__", error);
  }
}

async function getRoomChats(roomId) {
  try {
    const res = await axios.get(`${BASE_URL}/api/rooms/${roomId}/chats`);

    return res.data.data;
  } catch (error) {
    console.log("_error in creating new room record__", error);
  }
}

export { getAllRooms, createNewRoom, getRoomChats };
