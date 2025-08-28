import Referral from '../models/Referral.js'

export const getReferrals = async (req, res) => {
  const referrals = await Referral.find({ userId: req.user.id })
  res.json(referrals)
}