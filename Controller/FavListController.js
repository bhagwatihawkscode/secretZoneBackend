import TodoCollection from "../Model/TodoModel.js";

const favUpdat = async (req, res) => {
  let data = req.body;

  let id = data._id;
  try {
    const updatedUser = await TodoCollection.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({
        updatedUser,
        success: true,
        message: "Profile update successful",
      });
  } catch {
    console.error("Error uploading file:");
    res.status(500).json({ message: "Internal server error" });
  }
};
export default favUpdat;
