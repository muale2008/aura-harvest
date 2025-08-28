import mongoose from 'mongoose';

const ReferralUnlockSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  referrerId: { type: String, required: true },
  unlockedFeature: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  source: { type: String, enum: ['direct', 'campaign', 'organic'], default: 'direct' }
});

export default mongoose.models.ReferralUnlock || mongoose.model('ReferralUnlock', ReferralUnlockSchema);