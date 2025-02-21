import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  collection,
} from "firebase/firestore";

// Function to book a ticket
export const booking = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new Error("Booking data is required");
    }

    // Add the booking data to the Firestore "bookedtickets" collection
    const docRef = await addDoc(collection(db, "bookedtickets"), {
      ...data,
      createdAt: new Date(), // Add a timestamp
    });

    // Update the document with an activeTicket field (optional, based on use case)
    await updateDoc(docRef, {
      activeTicket: docRef.id,
    });

    return { id: docRef.id, message: "Booking successful" };
  } catch (error) {
    console.error("Booking Error:", error);
    throw new Error("Failed to book ticket");
  }
};

// Function to get booking details by ticket ID
export const getBookingDetails = async (id) => {
  try {
    const ticketRef = doc(db, "bookedtickets", id); // Reference to the ticket document
    const ticketSnap = await getDoc(ticketRef);

    if (!ticketSnap.exists()) {
      return { valid: false, message: "Ticket not found" };
    }

    const ticketData = ticketSnap.data();
    const eventDate = new Date(ticketData.date);
    const currentDate = new Date();

    const isActive = eventDate >= currentDate; // Check if the ticket date is in the future or today

    return {
      valid: isActive,
      message: isActive ? "Ticket is valid" : "Ticket has expired",
      user: ticketData.userid,
      date: ticketData.date,
    };
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw new Error("Failed to verify ticket");
  }
};

// Function to move a ticket to the user's history
export const addTicketToHistory = async (userId, ticketId) => {
  try {
    const userRef = doc(db, "users", userId); // Reference to the user's document

    // Update the user's history and clear the active ticket
    await updateDoc(userRef, {
      history: arrayUnion(ticketId), // Add the ticket ID to the user's history array
      activeTicket: null, // Clear the active ticket
    });

    return { success: true, message: "Ticket moved to history" };
  } catch (error) {
    console.error("Error updating history:", error);
    return { success: false, message: "Failed to update history" };
  }
};
