import TodoCollection from "../Model/TodoModel.js";
import moment from "moment";

const FavfilterAndSearch = async (req, res) => {
  const user = req.body;

  const query = user.query;
  let start = user.start;
  let end = user.end;

  const userId = global.user_id;

  try {
    const filter = { userID: userId, isFavorited: "true" }; // Always filter by userID
    if (start && end) {
      const startDate = moment(start, "YYYY/MM/DD").startOf("day").toDate();
      const endDate = moment(end, "YYYY/MM/DD").endOf("day").toDate();
      filter.createdAt = { $gte: startDate, $lte: endDate };
    }
    if (query) {
      filter.Title = { $regex: new RegExp(query, "i") };
    }

    let data = await TodoCollection.find(filter);

    if (data.length > 0) {
      data.reverse();
      res.status(200).json({ message: "", data });
    } else {
      res.status(201).json({ message: "No Secrets Found", data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
};

export default FavfilterAndSearch;
