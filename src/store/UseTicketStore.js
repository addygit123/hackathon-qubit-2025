import { create } from "zustand";

export const useTicketStore = create((set) => ({
  // State
  ticketDetails: null,
  qrCode: null,

  // Setters
  setTicketDetails: (details) => set({ ticketDetails: details }),
  setQRCode: (code) => set({ qrCode: code }),

  // Methods (if needed, e.g., for API calls)
}));
