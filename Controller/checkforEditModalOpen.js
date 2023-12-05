import TodoCollection from "../Model/TodoModel.js";

const openEditModal = async (req, res) => {
  try {
    let row = req.body.querystring;

    const data = await TodoCollection.findOne({ _id: row, PrivcyOK: "true" });

    if (!data) {
      console.log("No data found for the given rowId");
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default openEditModal;
