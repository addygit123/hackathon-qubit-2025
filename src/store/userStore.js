import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {
    name: "",
    email: "",
  },
  setUser: (data) => set({ user: data }),
}));

export default useUserStore;
