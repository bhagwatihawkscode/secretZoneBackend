import User from "../../Model/userModel.js";

const getAllUser = async (req, res) => {
  try {
    const excludeUserId = global.user_id; // Assuming globe.userid is the ID to exclude

    // Fetch all users from the database excluding the specified user
    const users = await User.find({ _id: { $ne: excludeUserId } }, "_id name");

    // Transform the data into the desired format
    const userOptions = users.map((user) => ({
      value: user._id.toString(),
      label: user.name,
    }));

    // Send the transformed data as an array
    res.json(userOptions);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAllUser;
