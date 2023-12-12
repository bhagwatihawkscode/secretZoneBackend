import TodoCollection from "../Model/TodoModel.js";
import User from "../Model/userModel.js";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.Cloud_name,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// async function uploadBase64ToCloudinary(base64Image) {
//   try {
//     const uploadResult = await cloudinary.uploader.upload(base64Image);
//     return uploadResult.secure_url;
//   } catch (error) {
//     console.error("Error uploading image to Cloudinary:", error);
//     throw error;
//   }
// }

// function extractImageData(inputString) {
//   const imgTagRegex = /<img.*?src=["'](data:image\/\w+;base64,.*?)["'].*?>/g;
//   const match = imgTagRegex.exec(inputString);

//   if (match && match[1]) {
//     const imageData = match[1];
//     const stringWithoutImgTag = inputString.replace(match[0], "");

//     return { image: imageData, stringWithoutImgTag };
//   } else {
//     // Return the original input string if no image tag is found
//     return { image: null, stringWithoutImgTag: inputString };
//   }
// }

// function convertHtmlToPlainText(htmlString) {
//   const $ = cheerio.load(htmlString);
//   return $.text();
// }

const whatsappshare = async (req, res) => {
  try {
    const obj = req.body;
    const dataobj = obj.querystring;
    let useraccess = "";
    if (dataobj.accessuser !== "") {
      const user = await User.findById(dataobj.accessuser);
      useraccess = user.token;
    }

    // Find the secret in the database by its ID and update it
    const secret = await TodoCollection.findByIdAndUpdate(
      dataobj.id, // Assuming 'id' is the field in dataobj that contains the document ID
      {
        $set: {
          permission: dataobj.permission,
          accessuser: useraccess,
        },
      }, // Specify the fields you want to update
      { new: true } // This option returns the modified document
    );

    if (!secret) {
      return res.status(404).json({ error: "Secret not found" });
    }

    // Generate a unique link with the updated document's data
    const uniqueLink = `http://localhost:3000/Secretlist?${secret._id}`;
    const text =
      `Hey! 🤫 I want to share a secret with you.%0A%0A` + `${uniqueLink}`;

    const whatsappUrl = dataobj.isMobile
      ? `whatsapp://send?text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;

    res.json({ whatsappUrl, statusCode: 200 });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default whatsappshare;
