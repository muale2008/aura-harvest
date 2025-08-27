const mongoose = require("mongoose");
const adConfigSchema = new mongoose.Schema({
  defaultFrequency: { type: String, enum: ["none","minimal","standard"], default: "standard" },
  perJobType: [{ tag: String, frequency: { type: String, enum: ["none","minimal","standard"] } }]
}, { timestamps: true });
module.exports = mongoose.model("AdConfig", adConfigSchema);
