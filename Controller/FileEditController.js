import path from "path";
import fs from "fs";
import archiver from "archiver";

import FileCollection from "../Model/FileModal.js";

const FileUpdateData = async (req, res) => {
  try {
    const data = req.body;
    const { title, id } = data;

    const uploadPath = "public/uploadsFile/";
    const newname = title.slice(0, 2);
    const zipFileName = `${newname}_Files_${Date.now()}.zip`;
    const zipFilePath = path.join(uploadPath, zipFileName);

    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

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

    for (const file of files) {
      const { name, base64 } = file;
      if (!base64) {
        throw new Error("Invalid base64 data");
      }
      /* eslint-disable no-useless-escape */

      let m = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      /* eslint-enable no-useless-escape */

      let b = Buffer.from(m[2], "base64");

      archive.append(b, { name: name });
    }

    await archive.finalize();

    // Find the existing record based on some criteria, for example, title
    await FileCollection.findOneAndUpdate(
      { _id: id },
      {
        Title: title,
        FileName: zipFileName,
        zipFilePath: `public/uploadsFile/${zipFileName}`,
      },
      { new: true, upsert: true }
    );

    res.json({ message: "Files Updated successfully", zipFilePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default FileUpdateData;
