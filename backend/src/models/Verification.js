const mongoose = require("mongoose");
const verifySchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  channel: { type: String, enum: ["sms","email"] },
  code: String,
  expiresAt: Date,
  deviceHash: String,
  attempts: { type: Number, default: 0 }
}, { timestamps: true });
verifySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model("Verification", verifySchema);
