import User from "../Model/userModel.js";

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

    // Store the token in the user's record
    newUser.token = "";
    newUser.profileImage = "";

    // Save the user record with the token in the database
    await newUser.save();

    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    // Handle the error
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Error registering the user" });
  }
}
export default registers;
