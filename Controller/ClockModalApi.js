import NotificationCollection from "../Model/NotificationModal.js";

const ClockModalData = async (req, res) => {
  try {
    let querystring = req.body;

    const rowId = querystring.querystring;
    const notification = await NotificationCollection.findOne({ rowid: rowId });
    if (notification) {
      res.status(201).json({
        userDays: notification.userdays,
        time: notification.reminderTime,
      });
    } else {
      res.status(201).json({ userDays: "", time: "" });
    }
  } catch (error) {
    console.log("Error", error);
  }
};
export default ClockModalData;
