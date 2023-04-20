import axios from "axios";

// Function to log an event to the audit trail
export const logEvent = async (eventData) => {
  // Implement the logging logic here
  console.log("Logging event:", eventData);
  const responseData = await axios.post(
    `http://localhost:5000/api/auditTrails/saveAuditTrail`,
    eventData
  );
};
