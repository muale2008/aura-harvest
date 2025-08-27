const router = require("express").Router();
const Verification = require("../models/Verification");
const User = require("../models/User");
const { fingerprint } = require("../middleware/device");

// Request verification code (SMS/email stub)
router.post("/request", async (req,res) => {
  const { email, channel = "email" } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const deviceHash = fingerprint(req);
  const code = ("" + Math.floor(100000 + Math.random()*900000));
  const expiresAt = new Date(Date.now() + 10*60*1000);

  await Verification.create({ userId: user._id, channel, code, expiresAt, deviceHash, attempts: 0 });
  // TODO: send via Twilio/SendGrid using env keys
  res.json({ ok: true, message: `Verification code sent via ${channel}` });
});

// Verify code with cooldown
router.post("/verify", async (req,res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const ver = await Verification.findOne({ userId: user._id }).sort({ createdAt: -1 });
  if (!ver) return res.status(400).json({ error: "No code requested" });
  if (ver.expiresAt < new Date()) return res.status(400).json({ error: "Code expired" });

  if (ver.code !== code) {
    ver.attempts = (ver.attempts || 0) + 1;
    await ver.save();
    return res.status(400).json({ error: "Invalid code" });
  }
  user.isVerified = true;
  await user.save();
  res.json({ ok: true, verified: true });
});

module.exports = router;
