import { create } from "zustand";

const useBusStore = create((set) => ({
  formData: {
    from: "",
    to: "",
    date: "",
    mode: "Bus",
  },
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
}));

export default useBusStore;
