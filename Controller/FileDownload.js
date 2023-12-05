import FileCollection from "../Model/FileModal.js";
import fs from "fs";
import path from "path";
import extract from "extract-zip";
import url from "url";

const DownloadZip = async (req, res) => {
  try {
    // Extract file ID from the request parameters
    const fileId = req.body.keyid;

    // Retrieve zip file information from the database
    const { zipFilePath, FileName } = await FileCollection.findById(fileId);

    // Extract the contents of the ZIP file for debugging
    const currentFileUrl = import.meta.url;
    const currentFilePath = url.fileURLToPath(currentFileUrl);
    const extractPath = path.resolve(
      path.dirname(currentFilePath),
      "extracted"
    );

    await extract(zipFilePath, { dir: extractPath });
    console.log(FileName);
    // Send the zip file to the client
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${FileName}"`);

    res.download(zipFilePath, (err) => {
      if (err) {
        console.error("Error during download:", err);
      } else {
        // Optionally, you can remove the extracted files
        fs.rmSync(extractPath, { recursive: true });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default DownloadZip;
