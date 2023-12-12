import path from "path";
import fs from "fs";
import archiver from "archiver"; // Add this line to import the archiver library

import FileCollection from "../Model/FileModal.js";

const FileData = async (req, res) => {
  try {
    const data = req.body;
    const { title } = data;

    // Create a directory to save files and the zip file
    const uploadPath = "public/uploadsFile/";
    const newname = title.slice(0, 2);
    const zipFileName = `${newname}_Files_${Date.now()}.zip`;
    const zipFilePath = path.join(uploadPath, zipFileName);

    // Create a write stream for the zip file
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Set compression level
    });

    // Pipe the archive to the output stream
    archive.pipe(output);

    const files = [];
    Object.keys(data).forEach((key) => {
      const match = key.match(/^files\[(\d+)\]\[(\w+)\]$/);
      if (match) {
        const index = parseInt(match[1]);
        const prop = match[2];
        if (!files[index]) {
          files[index] = {};
        }
        files[index][prop] = data[key];
      }
    });

    // Iterate over each file entry in files array
    for (const file of files) {
      const { name, base64 } = file;
      if (!base64) {
        throw new Error("Invalid base64 data");
      }
      /* eslint-disable no-useless-escape */

      let m = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      /* eslint-enable no-useless-escape */

      let b = Buffer.from(m[2], "base64");

      // Add file to the zip archive
      archive.append(b, { name: name });

      // Save individual file (optional, you can skip this if not needed)
      // fs.writeFileSync(filePath, b, "base64");
    }

    // Finalize the zip archive
    await archive.finalize();

    // Save the zip file path in the database
    const collectionRecord = new FileCollection({
      Title: title,
      userID: global.user_id,
      FileName: zipFileName,
      zipFilePath: `public/uploadsFile/${zipFileName}`,
      // Store the zip file name in the database
      // You can still store individual file information if needed
    });
    await collectionRecord.save();

    res.json({ message: "Files uploaded successfully", zipFilePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default FileData;
