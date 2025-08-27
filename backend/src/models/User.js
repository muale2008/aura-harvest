const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, index: true },
  passwordHash: String,
  phone: String,
  isVerified: { type: Boolean, default: false },
  inviteCode: { type: String, index: true },
  inviterUserId: { type: mongoose.Types.ObjectId, ref: "User" },
  referralUnlock: { type: Boolean, default: false },
  adFreeSlots: { type: Number, default: 0 },
  referralProgress: { type: Number, default: 0 }, // count of verified referred completions
  adminOverride: { type: Boolean, default: false },
  adminFrequency: { type: String, enum: ["none","minimal","standard"], default: "standard" },
  roles: { type: [String], default: ["user"] },
  favorites: [{ type: mongoose.Types.ObjectId, ref: "Job" }],
  notificationsSeenAt: { type: Date }
}, { timestamps: true });
module.exports = mongoose.model("User", userSchema);
