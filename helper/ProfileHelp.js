import fs from "fs";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadProfile = async (customPath, base64Image) => {
  try {
    // Upload to temporary storage (modify as needed)
    const temporaryStoragePath = "/tmp/"; // Use an in-memory storage or a temporary directory
    const uniqueFilename = `${new Date().getTime()}.png`;
    const temporaryFilePath = `${temporaryStoragePath}${uniqueFilename}`;

    /* eslint-disable no-useless-escape */

    let m = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    /* eslint-enable no-useless-escape */

    let b = Buffer.from(m[2], "base64");

    fs.writeFileSync(temporaryFilePath, b, "base64");

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      temporaryFilePath
    );
    const cloudinaryUrl = cloudinaryResponse.secure_url;

    // Clean up: Delete the temporary file
    fs.unlinkSync(temporaryFilePath);

    // Extract the part of the Cloudinary URL after /image/upload/
    const relativePath = cloudinaryUrl.replace(
      "https://res.cloudinary.com/dsvlrlr51/image/upload/",
      ""
    );

    return relativePath;
  } catch (error) {
    console.error("Error in uploadProfile:", error);
    throw new Error("Internal server error");
  }
};

export default uploadProfile;
