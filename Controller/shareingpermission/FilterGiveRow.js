import TodoCollection from "../../Model/TodoModel.js";

const senddatawithPermission = async (req, res) => {
  try {
    const secretId = req.params.id;

    // Find the secret in the database
    const secret = await TodoCollection.findById(secretId);

    if (!secret) {
      return res.status(404).json({ error: "Secret not found" });
    }

    // Create a temporary object based on the secret object

    // Check permissions and add the temporary permission field

    res.json({ secret, showEdit: "true" });
  } catch (error) {
    console.error("Error generating link:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default senddatawithPermission;
