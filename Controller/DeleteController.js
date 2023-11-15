import TodoCollection from "../Model/TodoModel.js";

const DeleteUser = async (req, res) => {
  let data = req.body;
  let id = data.key;

  try {
    // Use Mongoose to find and delete data by user ID
    const deletedData = await TodoCollection.findByIdAndRemove(id);

    if (deletedData) {
      res
        .status(200)
        .json({ success: true, message: "Data deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export default DeleteUser;
