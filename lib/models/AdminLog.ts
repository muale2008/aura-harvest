import mongoose from 'mongoose';

const AdminLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  actor: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed },
});

export default mongoose.models.AdminLog || mongoose.model('AdminLog', AdminLogSchema);
