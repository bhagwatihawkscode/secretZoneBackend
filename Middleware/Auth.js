import User from "../Model/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const AuthVerify = async (req, res, next) => {
  try {
    // Get the token from the "Authorization" header
    const tokenHalf = req.headers.authorization;

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9${tokenHalf}`;

    // Extract the actual token from the parts
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

    // Find the user with the given ID
    const user = await User.findById(decodedToken.id);

    // If the user is not found, return an error
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Attach the user object to the request object
    global.user_id = user._id;

    // Call the next middleware in the chain
    next();
  } catch (error) {
    // If there is an error, return a 500 error
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default AuthVerify;
