const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  salt: String,
  role: {
    type: String,
    default: "user"
  }
});

module.exports = mongoose.model("User", UserSchema);
