const mongoose = require("mongoose");
const auditSchema = new mongoose.Schema({
  action: String,
  actor: { type: mongoose.Types.ObjectId, ref: "User" },
  details: Object
}, { timestamps: true });
module.exports = mongoose.model("AuditLog", auditSchema);
