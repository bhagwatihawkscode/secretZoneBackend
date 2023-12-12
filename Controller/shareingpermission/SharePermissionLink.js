import TodoCollection from "../../Model/TodoModel.js";
import User from "../../Model/userModel.js";
import dotenv from "dotenv";

dotenv.config();
const genratelinks = async (req, res) => {
  try {
    const obj = req.body;
    const dataobj = obj.querystring;
    let useraccess = "";
    if (dataobj.accessuser !== "") {
      const user = await User.findById(dataobj.accessuser);
      useraccess = user.token;
    }

    // Find the secret in the database by its ID and update it
    const secret = await TodoCollection.findByIdAndUpdate(
      dataobj.id, // Assuming 'id' is the field in dataobj that contains the document ID
      {
        $set: {
          permission: dataobj.permission,
          accessuser: useraccess,
        },
      }, // Specify the fields you want to update
      { new: true } // This option returns the modified document
    );

    if (!secret) {
      return res.status(404).json({ error: "Secret not found" });
    }

    // Generate a unique link with the updated document's data
    const uniqueLink = `${process.env.baseUrl}/${secret._id}`;

    // Send the unique link to the frontend
    res.json({ link: uniqueLink });
  } catch (error) {
    console.error("Error generating link:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default genratelinks;
