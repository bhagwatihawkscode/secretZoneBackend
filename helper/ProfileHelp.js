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
  const uploadpath = `public/${customPath}`;

  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(uploadpath)) {
      fs.mkdirSync(uploadpath, { recursive: true }); // Create directories recursively
    }

    const uniqueFilename = `${new Date().getTime()}.png`;
    const filename = `${uploadpath}${uniqueFilename}`;

    let m = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let b = Buffer.from(m[2], "base64");

    fs.writeFile(filename, b, async (err) => {
      if (err) {
        reject(err);
      } else {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(filename);
          const cloudinaryUrl = cloudinaryResponse.secure_url;

          // Extract the part of the Cloudinary URL after /image/upload/
          const relativePath = cloudinaryUrl.replace(
            "https://res.cloudinary.com/dsvlrlr51/image/upload/",
            ""
          );

          // Resolve the promise with the relative path
          resolve(relativePath);
        } catch (cloudinaryError) {
          console.error("Error uploading to Cloudinary:", cloudinaryError);
          reject(cloudinaryError);
        } finally {
          // Clean up: Delete the local file after Cloudinary upload
          fs.unlinkSync(filename);
        }
      }
    });
  });
};

export default uploadProfile;
