import mongoose from "mongoose";
import crypto from "crypto";

// Creating user schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    require: true,
  },

  simplePassword: String,
  PasswordSalt: String,
  token: String,
  profileImage: String,
  PassKeyGen: String,
  resetToken: String,
  resetTokenUsedAt: Date,
});

// Method to set salt and hash the password for a user
UserSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  //   const password1 = toString(password)
  this.PasswordSalt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,

  this.simplePassword = crypto
    .pbkdf2Sync(password, this.PasswordSalt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password) {
  const simplePassword = crypto
    .pbkdf2Sync(password, this.PasswordSalt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.simplePassword === simplePassword;
};

UserSchema.methods.generateResetToken = function () {
  this.resetToken = crypto.randomBytes(20).toString("hex");
  this.resetTokenExpiresAt = Date.now() + 300000;
};

UserSchema.methods.isResetTokenUsed = function () {
  return !!this.resetTokenUsedAt;
};

// Exporting module to allow it to be imported in other files
const User = mongoose.model("User", UserSchema);
export default User;
