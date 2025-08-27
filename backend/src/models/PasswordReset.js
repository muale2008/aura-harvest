const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  token: String,
  expiresAt: Date
}, { timestamps: true });
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model("PasswordReset", schema);
