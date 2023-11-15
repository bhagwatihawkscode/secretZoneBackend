import uploadProfile from "../helper/ProfileHelp.js";
import User from "../Model/userModel.js";

const uploadFile = async (req, res) => {
  let uploadpath = "/uploads/";

  try {
    const userData = req.body;
    let file = userData.file;
    let imagePath = "";

    if (file && file.startsWith("data:image/")) {
      imagePath = await uploadProfile(uploadpath, file);
    } else {
      imagePath = userData.images;
    }

    if (!userData.userId) {
      return res.status(400).json({ message: "ID is required" });
    }

    const id = userData.userId;
    const updateFields = {
      profileImage: imagePath,
    };

    // Check if the user provided any other fields to update
    if (userData.name) {
      updateFields.name = userData.name;
    }
    if (userData.email) {
      updateFields.email = userData.email;
    }

    if (userData.Address) {
      updateFields.Address = userData.Address;
    }

    // Add more fields here as needed...

    const updatedUser = await User.findByIdAndUpdate(id, updateFields);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      updatedUser,
      success: true,
      message: "Profile update successful",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default uploadFile;
