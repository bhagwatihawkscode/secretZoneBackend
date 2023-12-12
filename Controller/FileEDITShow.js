import FileCollection from "../Model/FileModal.js";
import fs from "fs";

const FileEditData = async (req, res) => {
  let data = req.body;
  let id = data.key;

  try {
    const fileData = await FileCollection.findById(id);

    if (!fileData) {
      return res.status(404).json({ message: "No data objects found" });
    }

    // Assuming you have the zip file path and name stored in the database
    const zipFilePath = fileData.zipFilePath;
    const FileName = fileData.FileName;

    // Read the zip file content
    const zipFileContent = fs.readFileSync(zipFilePath);

    // Send the response with the zip file as an attachment
    res.status(201).json({
      data: fileData,
      zipFile: {
        filename: FileName,
        content: zipFileContent.toString("base64"), // Convert buffer to base64
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

export default FileEditData;
