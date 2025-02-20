import create from "zustand";

const useStore = create((set) => ({
  //user store
  user: null,
  setUser: (user = set({ user })),

  tickets: [],

  // Stores ticket data
  addTicket: (ticket) =>
    set((state) => ({ tickets: [...state.tickets, ticket] })),
  clearTickets: () => set({ tickets: [] }),

  // QR Code State
  qrCodeData: null, // Stores the scanned QR code
  setQrCodeData: (data) => set({ qrCodeData: data }),

  // Alerts State
  alerts: [], // Stores alert notifications
  addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
  clearAlerts: () => set({ alerts: [] }),
}));

export default useStore;
