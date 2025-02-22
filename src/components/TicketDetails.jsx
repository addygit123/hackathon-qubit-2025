import React from "react";
import useTicketStore from "../store/UseTicketStore";

const TicketDetails = () => {
  const ticketDetails = useTicketStore((state) => state.ticketDetails);

  return ticketDetails ? (
    <div>
      <h2>Ticket Details</h2>
      <p>
        <strong>Train:</strong> {ticketDetails.trainName}
      </p>
      <p>
        <strong>From:</strong> {ticketDetails.from}
      </p>
      <p>
        <strong>To:</strong> {ticketDetails.to}
      </p>
      <p>
        <strong>Date:</strong> {ticketDetails.date}
      </p>
      <p>
        <strong>Seats Booked:</strong> {ticketDetails.seatsBooked}
      </p>
    </div>
  ) : (
    <p>No Tickets Available</p>
  );
};

export default TicketDetails;
