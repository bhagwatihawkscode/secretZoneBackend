import TodoCollection from "../Model/TodoModel.js";

const LocationFilter = async (req, res) => {
  try {
    const user = req.body;
    const query = user.query;

    // Use $or to find documents where Location or Title matches the query
    const filter = { Location: { $regex: new RegExp(query, "i") } };

    // Find documents that match the filter
    const data = await TodoCollection.find(filter);

    // Extract an array of titles from the matched documents
    const matchingTitles = data.map((todo) => todo.Title);

    res.status(200).json({ arraydata: matchingTitles });
  } catch (error) {
    console.error("Error in LocationFilter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default LocationFilter;
