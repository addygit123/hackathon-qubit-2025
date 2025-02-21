import { create } from "zustand";

export const useTicketStore = create((set) => ({
  // State
  scannedData: null,
  ticketStatus: null,

  // Setters
  setScannedData: (data) => set({ scannedData: data }),
  setTicketStatus: (status) => set({ ticketStatus: status }),

  // Methods
  verifyTicket: async (id) => {
    try {
      const response = await fetch("http://localhost:5000/ticketcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // Pass the ticket ID
      });

      const result = await response.json();
      set({ ticketStatus: result }); // Update ticket status in the store
    } catch (error) {
      console.error("Verification Error:", error);
      set({
        ticketStatus: { valid: false, message: "Verification failed" }, // Handle error
      });
    }
  },
}));
