import User from "../Model/userModel.js";
import TodoCollection from "../Model/TodoModel.js";
import bcrypt from "bcrypt";

const passverify = async (req, res) => {
  try {
    // User's ID
    // Provided password for verification
    let ID = global.user_id;
    let childId = req.body;

    let password = childId.querystring.password;
    let itemId = childId.querystring.keyid;

    // Fetch the user's hashed password from the database
    const userData = await TodoCollection.findById(itemId);

    if (!userData) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }

    const storedPassKeyHash = userData.PassKeyGen;

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, storedPassKeyHash);

    if (isPasswordValid) {
      return res.status(200).json({
        statusCode: 201,
        success: true,
        message: "Unlock SuccessFully",
      });
    } else {
      return res.status(200).json({
        statusCode: 401,
        message: "Password is invalid",
      });
    }
  } catch (error) {
    console.error("Error in password verification", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
export default passverify;
