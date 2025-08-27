const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  title: String,
  body: String,
  readAt: Date
}, { timestamps: true });
module.exports = mongoose.model("Notification", schema);
