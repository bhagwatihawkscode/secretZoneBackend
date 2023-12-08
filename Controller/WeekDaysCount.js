import TodoCollection from "../Model/TodoModel.js";
import FileCollection from "../Model/FileModal.js";

const WeekData = async (req, res) => {
  try {
    const currentDate = new Date();
    const previousSunday = new Date(currentDate);
    previousSunday.setDate(currentDate.getDate() - currentDate.getDay()); // Adjust for Sunday

    const currentSaturday = new Date(previousSunday);
    currentSaturday.setDate(previousSunday.getDate() + 6);

    // console.log("Previous Sunday:", previousSunday.toISOString());
    // console.log("Current Saturday:", currentSaturday.toISOString());

    const result = await TodoCollection.aggregate([
      {
        $match: {
          userID: global.user_id,
          createdAt: {
            $gte: previousSunday,
            $lte: currentSaturday,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: { $add: ["$createdAt", 1] } }, // Adding 1 to match JavaScript's getDay()
          count: { $sum: 1 },
        },
      },
    ]);

    // Create an array representing each day of the week
    const daysOfWeek = Array.from({ length: 7 }, (_, index) => index + 1);

    // Map the result to extract counts for each day
    const formattedResult = daysOfWeek.map(
      (day) => result.find((entry) => entry._id === day)?.count || 0
    );

    const Fileresult = await FileCollection.aggregate([
      {
        $match: {
          userID: global.user_id,
          createdAt: {
            $gte: previousSunday,
            $lte: currentSaturday,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: { $add: ["$createdAt", 1] } }, // Adding 1 to match JavaScript's getDay()
          count: { $sum: 1 },
        },
      },
    ]);

    // Create an array representing each day of the week

    // Map the result to extract counts for each day
    const formattedResultForFile = daysOfWeek.map(
      (day) => Fileresult.find((entry) => entry._id === day)?.count || 0
    );

    // console.log("Counts for each day:", formattedResult);

    // console.log("Query results:", result);

    return res
      .status(200)
      .json({
        success: true,
        data: formattedResult,
        FileData: formattedResultForFile,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error" });
  }
};

export default WeekData;
