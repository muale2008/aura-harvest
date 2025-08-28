import mongoose from 'mongoose';

const AdminLogSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  action: { type: String, required: true },
  target: { type: String },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Object }
});

export default mongoose.models.AdminLog || mongoose.model('AdminLog', AdminLogSchema);