import User from "../Model/userModel.js";
import sendPasswordResetEmail from "../util/emailForgetpass.js";
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found", message: "User not found" });
    }

    user.generateResetToken();
    await user.save();

    sendPasswordResetEmail(user.email, user.resetToken);

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const getResetPasswordForm = (req, res) => {
//   const { token } = req.params;
//   res.render("reset-password", { token });
// };

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ resetToken: token });

    if (!user || user.isResetTokenUsed()) {
      return res.status(400).json({
        error: "Invalid or expired reset link",
        message: "Invalid or expired reset link",
      });
    }

    user.setPassword(password);

    // Mark the reset token as used
    user.resetTokenUsedAt = Date.now();

    // Clear the reset token and expiration date
    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
