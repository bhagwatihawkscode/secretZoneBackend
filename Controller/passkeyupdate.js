import bcrypt from "bcrypt";
import TodoCollection from "../Model/TodoModel.js";

const passkeyupdate = async (req, res) => {
  try {
    const ID = global.user_id;
    let childId = req.body;

    let password = childId.querystring.password;
    let itemId = childId.querystring.keyid;

    // Generate a salt for hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the passKey with the salt
    const hashedPassKey = await bcrypt.hash(password, salt);

    // Update the user document with the hashed passKey
    const data = await TodoCollection.findByIdAndUpdate(
      itemId,
      { PassKeyGen: hashedPassKey, PrivcyOK: "true" },
      { new: true }
    );

    if (data) {
      return res.status(201).json({
        statusCode: 201,
        message: "Genrate SuccessFully",
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

export default passkeyupdate;
