import TodoCollection from "../Model/TodoModel.js";

const UpdateTodo = async (req, res) => {
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
        .json({ success: false, message: "Secrects not found" });
    }
    res
      .status(200)
      .json({
        updatedUser,
        success: true,
        message: "Secrets update successful",
      });
  } catch {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default UpdateTodo;
