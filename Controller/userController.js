import User from "../Model/userModel.js";
import { createSecretToken } from "../util/SecretToken.js";

async function registers({ body }, res) {
  try {
    const email = body.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      name: body.name,
      email: body.email,
      Address: body.Address,
    });

    // Set the password using the setPassword method
    newUser.setPassword(body.password);

    // Save the user to the database
    await newUser.save();

    // Create a token for the user
    const token = createSecretToken(newUser._id);

    // Extract a portion of the token if needed
    const splitToken = token.substring(token.indexOf("."), token.length);

    // Assign the token to the user
    newUser.token = splitToken;

    // Save the user record with the token in the database
    await newUser.save();

    // You can also set other properties like profileImage here

    return res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        token: splitToken,
      });
  } catch (err) {
    // Handle the errorw
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Error registering the user" });
  }
}

export default registers;
