import TodoCollection from "../Model/TodoModel.js";

const ShowTable = async (req, res) => {
  // Get the authenticated user object
  try {
    let data = await TodoCollection.find({ userID: global.user_id });
    if (!data) {
      return res
        .status(201)
        .json({ message: "Please Add Some Secrects ", data });
    }
    return res.status(200).json({ data });
  } catch {
    return res.status(500).json({ message: "internal error " });
  }
};
export default ShowTable;
