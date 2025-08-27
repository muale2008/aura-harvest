const mongoose = require("mongoose");
const jobVersionSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  versionNote: String,
  createdAt: { type: Date, default: Date.now }
});
const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  status: { type: String, enum: ["draft","published","archived"], default: "draft" },
  versions: [jobVersionSchema],
  repostHistory: [{ at: Date, by: String, note: String }],
  adIntensity: { type: String, enum: ["none","minimal","standard"], default: "standard" }
}, { timestamps: true });
module.exports = mongoose.model("Job", jobSchema);
