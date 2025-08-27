const mongoose = require("mongoose");
const announcementSchema = new mongoose.Schema({
  message: String,
  markdown: String,
  startsAt: Date,
  endsAt: Date
}, { timestamps: true });
module.exports = mongoose.model("Announcement", announcementSchema);
