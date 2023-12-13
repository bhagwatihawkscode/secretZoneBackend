import { File } from "megajs";
import FileCollection from "../Model/FileModal.js";

const FileEditData = async (req, res) => {
  try {
    const data = req.body;
    const id = data.key;

    const fileData = await FileCollection.findById(id);

    if (!fileData) {
      return res.status(404).json({ message: "No data objects found" });
    }

    // Assuming you have the Mega link stored in the database as a Promise

    // Send the response with the download link and file content
    res.status(201).json({
      data: fileData,

      // Convert content to base64 for transport
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

export default FileEditData;
