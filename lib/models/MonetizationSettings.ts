import mongoose from 'mongoose';

const MonetizationSettingsSchema = new mongoose.Schema({
  adEnabled: { type: Boolean, default: true },
  affiliateJobsEnabled: { type: Boolean, default: false },
  microPaymentsEnabled: { type: Boolean, default: false },
  updatedBy: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.MonetizationSettings || mongoose.model('MonetizationSettings', MonetizationSettingsSchema);