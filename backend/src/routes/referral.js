const router = require("express").Router();
const { authRequired } = require("../middleware/auth");
const { verifyReferralCode, markReferralUsed } = require("../services/referralService");
const User = require("../models/User");

router.post("/unlock", authRequired, async (req, res) => {
  const { referralCode } = req.body;
  const userId = req.user.id;
  if (!referralCode) return res.status(400).json({ error: "Missing referralCode" });
  const ok = await verifyReferralCode(referralCode, userId);
  if (!ok) return res.status(403).json({ error: "Invalid or used referral code" });
  await markReferralUsed(referralCode, userId);
  const u = await User.findById(userId);
  return res.json({ unlocked: true, adFreeSlots: u.adFreeSlots, referralUnlock: u.referralUnlock });
});

router.post("/consume-slot", authRequired, async (req,res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (user.adFreeSlots <= 0) return res.status(400).json({ error: "No ad-free slots" });
  user.adFreeSlots -= 1;
  user.referralUnlock = user.adFreeSlots > 0;
  await user.save();
  res.json({ ok: true, remaining: user.adFreeSlots });
});

module.exports = router;
