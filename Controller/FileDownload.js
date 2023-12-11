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

    // Use the /tmp directory for extraction
    const extractPath = "/tmp/extracted";

    // Ensure the /tmp/extracted directory exists
    if (!fs.existsSync(extractPath)) {
      fs.mkdirSync(extractPath, { recursive: true });
    }

    // Extract the contents of the ZIP file
    await extract(zipFilePath, { dir: extractPath });

    // Send the zip file to the client
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${FileName}"`);

    res.download(zipFilePath, async (err) => {
      if (err) {
        console.error("Error during download:", err);
      } else {
        await cleanupExtractedFiles(extractPath);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

async function cleanupExtractedFiles(extractPath) {
  try {
    await fs.rmSync(extractPath, { recursive: true });
  } catch (error) {
    console.error("Error cleaning up extracted files:", error);
  }
}

export default DownloadZip;
