import TodoCollection from "../Model/TodoModel.js";

import moment from "moment";
import NotificationCollection from "../Model/NotificationModal.js";

const filterAndSearch = async (req, res) => {
  const user = req.body;

  const query = user.query;
  let start = user.start;
  let end = user.end;
  let Fav = user.isFavorited;
  const userId = global.user_id;
  let rowId = user.rowId;
  let notificationId = user.notificationId;

  try {
    const filter = { userID: userId };
    if (rowId) {
      filter._id = rowId;
      // let rows = await TodoCollection.find({ _id: rowId });

      await NotificationCollection.updateOne(
        { _id: notificationId },
        { $set: { updatestatus: "1" } }
      );
    }
    if (start && end) {
      const startDate = moment(start, "YYYY/MM/DD").startOf("day").toDate();
      const endDate = moment(end, "YYYY/MM/DD").endOf("day").toDate();
      filter.createdAt = { $gte: startDate, $lte: endDate };
    }
    if (query) {
      filter.Title = { $regex: new RegExp(query, "i") };
    }
    if (Fav) {
      if (Fav === "true") {
        filter.isFavorited = "true";
      } else if (Fav === "false") {
        filter.isFavorited = "false";
      }
    }

    let data = await TodoCollection.find(filter);

    if (data.length > 0) {
      data.reverse();
      res.status(200).json({ message: "", data });
    } else {
      res.status(201).json({ message: "No Secrets Found", data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
};

export default filterAndSearch;
