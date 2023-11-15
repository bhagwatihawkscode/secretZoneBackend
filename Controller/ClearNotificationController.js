import NotificationCollection from "../Model/NotificationModal.js";

const ClearNotification = async (req, res) => {
  try {
    // Update documents with updateStatus equal to "0" to "1"
    const result = await NotificationCollection.updateMany(
      { updatestatus: "0" },
      { $set: { updatestatus: "1" } }
    );

    // Check the result for the number of modified documents
    if (result.modifiedCount > 0) {
      // Send a success response
      res.status(200).json({ message: "Notifications cleared successfully." });
    } else {
      // If no documents were modified, send a message indicating that there were no matching documents
      res
        .status(200)
        .json({ message: "No notifications found with updatestatus '0'." });
    }
  } catch (error) {
    // Handle errors
    console.error("Error clearing notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default ClearNotification;
