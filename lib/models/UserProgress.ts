import mongoose from 'mongoose';

const UserProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  onboardingStep: { type: String },
  resumeStatus: { type: String, enum: ['draft', 'complete'], default: 'draft' },
  jobCompletion: [{ type: String }],
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.models.UserProgress || mongoose.model('UserProgress', UserProgressSchema);