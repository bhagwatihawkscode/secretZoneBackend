import TodoCollection from "../Model/TodoModel.js";
import FileCollection from "../Model/FileModal.js";

const countUniqueLocationsByUserId = async (userId) => {
  try {
    const uniqueLocations = await TodoCollection.distinct("Location", {
      userID: userId,
    });
    const countResult = uniqueLocations.length;

    return countResult;
  } catch (error) {
    console.error("Error counting unique locations:", error);
    throw error;
  }
};

const TotalAndTodayCount = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const userId = global.user_id;

  
    const uniqueLocationsCount = await countUniqueLocationsByUserId(userId);

  
    const todayCount =
      (await TodoCollection.countDocuments({
        createdAt: { $gte: today },
        userID: userId,
      })) +
      (await FileCollection.countDocuments({
        createdAt: { $gte: today },
        userID: userId,
      }));

    // Get total counts
    const totalCount = await TodoCollection.countDocuments({
      userID: userId,
    });
    const totalFileCount = await FileCollection.countDocuments({
      userID: userId,
    });

    res.json({ todayCount, totalCount, totalFileCount, uniqueLocationsCount });
  } catch (error) {
    res.json({ error: error.message });
  }
};
export default TotalAndTodayCount;
