import { create } from "zustand";

const useFlightStore = create((set) => ({
  formData: {
    from: "",
    to: "",
    date: "",
    mode: "Flight", // Default mode set to Flight
  },
  setFormData: (data) => set({ formData: data }),
}));

export default useFlightStore;
