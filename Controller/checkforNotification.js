import NotificationCollection from "../Model/NotificationModal.js";
const shownotificationdata = async (req, res) => {
  try {
    const data = await NotificationCollection.find({
      userId: global.user_id,
      updatestatus: "1",
    });

    const currentDate = new Date();

    for (const notificationItem of data) {
      const createdDate = new Date(notificationItem.createdAt);
      const expirationDate = new Date(
        createdDate.getTime() + notificationItem.userdays * 24 * 60 * 60 * 1000
      );

      if (currentDate >= createdDate && currentDate <= expirationDate) {
        try {
          await NotificationCollection.findByIdAndUpdate(notificationItem._id, {
            updatestatus: "0",
          });
        } catch (error) {
          console.error(
            `Error updating notification with _id: ${notificationItem._id}`,
            error
          );
        }
      } else {
        await NotificationCollection.findByIdAndRemove(notificationItem._id);
      }
    }

    res.status(200).json({ message: "Notifications updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default shownotificationdata;
