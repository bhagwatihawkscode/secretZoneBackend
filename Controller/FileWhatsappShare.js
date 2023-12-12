import FileCollection from "../Model/FileModal.js";

const WhatsappShareZip = async (req, res) => {
  try {
    const whatsappdata = req.body.querystring;
    let senddataId = whatsappdata.childId;
    const isMobile = whatsappdata.isMobile;
    const files = await FileCollection.findById(senddataId);

    // Retrieve zip file information from the database
    const { FileName } = files;

    // Generate a link to the ZIP file
    const baseURL = "http://localhost:4000/";
    const zipFileLink = `${baseURL}uploadsFile/${FileName}`;

    // Generate the text for the WhatsApp message
    const text =
      `🔒 Hey! I want to share some secret files with you.%0A` +
      `📁 Download your file: ${encodeURIComponent(zipFileLink)}`;

    // Generate the WhatsApp API URL
    const whatsappUrl = isMobile
      ? `whatsapp://send?text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;

    res.json({ whatsappUrl, statusCode: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default WhatsappShareZip;
