import User from '../Model/userModel.js';
import {createSecretToken} from '../util/SecretToken.js';

 async function logins({body}, res) {
  try {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the entered password is valid
    if (user.validPassword(body.password)) {
      // Password is correct
      const token = createSecretToken(user._id);
       
      // Store the token in the user's database record
      const splitToken = token.substring( token.indexOf('.'), token.length);
      
      user.token = splitToken;
       
      // Save the user record with the token in the database
      await user.save();

    

      return res.status(200).json({ success: true, message: 'Login successful',token:splitToken });
    } else {
      // Password is incorrect
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (err) {
    // Handle the error
    console.error(err);
    return res.status(500).json({ message: 'Error finding the user' });
  }
}
export default logins;