import archiver from "archiver";
import { Storage } from "megajs";
import FileCollection from "../Model/FileModal.js";

const FileData = async (req, res) => {
  try {
    const data = req.body;
    const { title } = data;

    const archive = archiver("zip", {
      zlib: { level: 9 }, // Set compression level
    });

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

      let b = Buffer.from(m[2], "base64");

      // Add file to the zip archive
      archive.append(b, { name: name });
    }

    const zipBuffer = await new Promise((resolve, reject) => {
      archive.on("error", reject);
      archive.finalize();
      const buffers = [];
      archive.on("data", (data) => buffers.push(data));
      archive.on("end", () => resolve(Buffer.concat(buffers)));
    });

    // Upload the zip file to MEGA
    const storage = await new Storage({
      email: "SecretZone.Team@gmail.com",
      password: "Bhagu@123",
    }).ready;

    const megaFile = await storage.upload(title + ".zip", zipBuffer).complete;
    const megaLink = megaFile.link();
    const resolvedMegaLink = await megaLink;
    // Save the MEGA link in the database
    const collectionRecord = new FileCollection({
      Title: title,
      userID: global.user_id,
      FileName: title + ".zip",
      megaLink: resolvedMegaLink,
    });
    await collectionRecord.save();
    console.log(collectionRecord);
    res.json({ message: "Files uploaded  successfully", megaLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default FileData;
