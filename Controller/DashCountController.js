import TodoCollection from "../Model/TodoModel.js";

const TotalAndTodayCount = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the start of the day
    const userId = global.user_id;
    // Get the parentId from the query parameters

    const todayCount = await TodoCollection.countDocuments({
      createdAt: { $gte: today },
      userID: userId,
    });

    const totalCount = await TodoCollection.countDocuments({
      userID: userId,
    });

    res.json({ todayCount, totalCount });
  } catch (error) {
    res.json({ error: error.message });
  }
};
export default TotalAndTodayCount;
