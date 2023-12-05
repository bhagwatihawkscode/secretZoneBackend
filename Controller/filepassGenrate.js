import crypto from "crypto";
import FileCollection from "../Model/FileModal.js";
const filepassGenrate = async (req, res) => {
  try {
    const ID = global.user_id;
    let childId = req.body;

    let password = childId.querystring.password;
    let itemId = childId.querystring.keyid;

    // Hash the passKey using the crypto module
    const hashedPassKey = crypto
      .createHash("sha256") // You can choose a different algorithm if needed
      .update(password)
      .digest("hex");

    // Update the user document with the hashed passKey
    const data = await FileCollection.findByIdAndUpdate(
      itemId,
      { PassKeyGen: hashedPassKey, PrivcyOK: "true" },
      { new: true }
    );

    if (data) {
      return res.status(201).json({
        statusCode: 201,
        message: "Generate Successfully",
        data: data,
      });
    } else {
      return res.status(403).json({
        statusCode: 403,
        message: "Failed to update PassKey",
      });
    }
  } catch (error) {
    console.log("Error in updating password", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

export default filepassGenrate;
