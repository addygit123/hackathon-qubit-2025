// import { QrReader } from "react-qr-reader";
// import { useTicketStore } from "../store/UseTicketStore";

// const QrScanner = () => {
//   const { scannedData, ticketStatus, setScannedData, verifyTicket } =
//     useTicketStore();

//   const handleScan = async (data) => {
//     if (data) {
//       setScannedData(data);
//       verifyTicket(data);
//     }
//   };

//   const handleError = (err) => {
//     console.error("QR Scan Error:", err);
//   };

//   return (
//     <div>
//       <h2>QR Ticket Scanner</h2>
//       <QrReader
//         onResult={(result, error) => {
//           if (result) handleScan(result.text);
//           if (error) handleError(error);
//         }}
//         constraints={{ facingMode: "environment" }}
//         style={{ width: "100%" }}
//       />

//       {scannedData && <p>Scanned Ticket ID: {scannedData}</p>}

//       {ticketStatus && (
//         <div>
//           <h3>Status: {ticketStatus.message}</h3>
//           {ticketStatus.valid && (
//             <>
//               <p>User: {ticketStatus.user}</p>
//               <p>Event: {ticketStatus.event}</p>
//               <p>Date: {ticketStatus.date}</p>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QrScanner;

// // store mei add krdena

// // export const useTicketStore = create((set) => ({
// //     scannedData: null,
// //     ticketStatus: null,

// //     setScannedData: (data) => set({ scannedData: data }),
// //     setTicketStatus: (status) => set({ ticketStatus: status }),

// //     verifyTicket: async (id) => {
// //       try {
// //         const response = await fetch("http://localhost:5000/ticketcheck", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ id }),
// //         });

// //         const result = await response.json();
// //         set({ ticketStatus: result });
// //       } catch (error) {
// //         console.error("Verification Error:", error);
// //         set({ ticketStatus: { valid: false, message: "Verification failed" } });
// //       }
// //     },
// //   }));
