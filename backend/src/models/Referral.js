const mongoose = require("mongoose");
const referralSchema = new mongoose.Schema({
  code: { type: String, unique: true, index: true },
  createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  usageCount: { type: Number, default: 0 },
  usedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }]
}, { timestamps: true });
module.exports = mongoose.model("Referral", referralSchema);
