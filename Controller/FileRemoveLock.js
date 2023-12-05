import FileCollection from "../Model/FileModal.js";
import crypto from "crypto";

const FileLockRemove = async (req, res) => {
  try {
    let ID = global.user_id;
    const providedPassKey = req.body.querystring.pass;
    const childid = req.body.querystring.childId;

    // Fetch the user's hashed password from the database
    const userData = await FileCollection.findById(childid);

    if (!userData) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }

    const storedPassKeyHash = userData.PassKeyGen;

    // Hash the provided password using the crypto module
    const providedPassKeyHash = crypto
      .createHash("sha256") // You can choose a different algorithm if needed
      .update(providedPassKey)
      .digest("hex");

    // Compare the hashed provided password with the stored hash
    const isPasswordValid = storedPassKeyHash === providedPassKeyHash;

    if (isPasswordValid) {
      let user = await FileCollection.findOneAndUpdate(
        { _id: childid },
        { PrivcyOK: "false", PassKeyGen: "" },
        { new: true }
      );

      if (user) {
        return res.status(200).json({
          statusCode: 201,
          message: "Successfully Remove",
          data: user,
        });
      } else {
        return res.status(403).json({
          statusCode: 403,
          message: "Failed to update PassKey",
        });
      }
    } else {
      return res.status(200).json({
        statusCode: 401,
        message: "Password is invalid",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default FileLockRemove;
