import { File } from "megajs"; // Import the megajs package

import FileCollection from "../Model/FileModal.js";

const DownloadZip = async (req, res) => {
  try {
    // Extract file ID from the request parameters
    const fileId = req.body.keyid;

    // Retrieve Mega link from the database
    const { megaLink, FileName } = await FileCollection.findById(fileId);

    // Download the Mega file
    const megaFile = File.fromURL(megaLink);

    megaFile.loadAttributes((err) => {
      if (err) {
        console.error("Error loading Mega file attributes:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Set response headers for the zip file
      res.attachment(FileName);
      res.setHeader("Content-Type", "application/zip");

      // Pipe Mega file stream directly to the response stream
      megaFile.download((err, data) => {
        if (err) {
          console.error("Error downloading Mega file:", err);
          res.status(500).send("Internal Server Error");
          return;
        }

        // Send the Mega file as a blob to the client
        res.end(data);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default DownloadZip;
