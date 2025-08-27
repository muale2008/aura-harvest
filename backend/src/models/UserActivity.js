const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["job_completion"] },
  jobId: { type: mongoose.Types.ObjectId, ref: "Job" }
}, { timestamps: true });
module.exports = mongoose.model("UserActivity", activitySchema);
