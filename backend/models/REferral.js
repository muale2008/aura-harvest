import mongoose from 'mongoose'

const referralSchema = new mongoose.Schema({
  userId: String,
  code: String,
  referredUsers: [String],
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Referral', referralSchema)