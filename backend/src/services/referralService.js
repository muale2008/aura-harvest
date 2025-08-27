const Referral = require("../models/Referral");
const User = require("../models/User");
const UserActivity = require("../models/UserActivity");

async function verifyReferralCode(code, userId) {
  const ref = await Referral.findOne({ code });
  if (!ref) return false;
  if (ref.usedBy?.some(id => String(id) === String(userId))) return false;
  return true;
}
async function markReferralUsed(code, userId) {
  await Referral.updateOne({ code }, {
    $addToSet: { usedBy: userId },
    $inc: { usageCount: 1 }
  });
  await User.updateOne({ _id: userId }, { $set: { referralUnlock: true }, $inc: { adFreeSlots: 1 } });
}

// Called when a referred user completes a job
async function trackReferredCompletion(userId) {
  const user = await User.findById(userId);
  if (!user?.inviterUserId) return;
  const inviterId = user.inviterUserId;
  const refReq = parseInt(process.env.REFERRAL_INVITES_REQUIRED || "3", 10);
  const inviter = await User.findById(inviterId);
  inviter.referralProgress = (inviter.referralProgress || 0) + 1;
  if (inviter.referralProgress % refReq === 0) {
    inviter.adFreeSlots = (inviter.adFreeSlots || 0) + 1;
    inviter.referralUnlock = true;
  }
  await inviter.save();
}

module.exports = { verifyReferralCode, markReferralUsed, trackReferredCompletion };
