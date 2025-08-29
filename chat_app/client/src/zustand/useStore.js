import { create } from "zustand";

const useStore = create((set) => ({
  selectedRoom: {},
  username: "",

  updateSelectedRoom: (newRoom) => set({ selectedRoom: newRoom[0] }),
  updateUsername: (name) => set({ username: name }),
}));

export default useStore;
