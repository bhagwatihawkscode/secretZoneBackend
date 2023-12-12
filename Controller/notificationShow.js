import NotificationCollection from "../Model/NotificationModal.js";
import TodoCollection from "../Model/TodoModel.js";

function filterUniqueObjectsByReminderTime(inputArray) {
  const uniqueReminderTimes = new Set();
  const newArray = [];

  inputArray.forEach((item) => {
    const reminderTime = item.reminderTime;

    if (!uniqueReminderTimes.has(reminderTime)) {
      uniqueReminderTimes.add(reminderTime);
      newArray.push(item);
    }
  });

  return newArray;
}
const shownotifiction = async (req, res) => {
  try {
    const data = await NotificationCollection.find({
      userId: global.user_id,
      expair: "0",
      updatestatus: "0",
    });

    const rowids = data.map((item) => item.rowid);

    const todoData = await TodoCollection.find({ _id: rowids });

    const titleAndTimeArray = todoData.map((item) => {
      const notificationItems = data.filter(
        (notification) => notification.rowid === item._id.toString()
      );

      return notificationItems.map((notificationItem) => {
        const title = item.Title;
        const reminderTime = notificationItem.reminderTime;
        const isReminderInFuture = new Date(reminderTime) > new Date();

        return {
          title,
          reminderTime,
          isReminderInFuture,
          rowId: item._id,
          notificationId: notificationItem._id,
        };
      });
    });

    // Flatten the nested arrays into a single array of notifications
    const flattenedArray = titleAndTimeArray.flat();
    const set = new Set(flattenedArray);
    const arrayOfObjects = Array.from(set);

    res.status(200).json(filterUniqueObjectsByReminderTime(arrayOfObjects));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default shownotifiction;
