import TodoCollection from "../Model/TodoModel.js";

const Serach = async (req, res) => {
  let title = req.body;
  const { query } = title.Title;
  if (!query) {
    return res.status(400).json({ message: "Please provide a search query." });
  }

  try {
    // Use a regular expression to perform a case-insensitive search on the 'fieldToSearch' in the database
    const data = await TodoCollection.find({
      Title: { $regex: new RegExp(query, "i") },
      userID: global.user_id,
    });
    console.log(data);
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ message: "No matching data found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
};
export default Serach;
