const router = require("express").Router();
const PasswordReset = require("../models/PasswordReset");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Request reset
router.post("/request", async (req,res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ ok: true }); // do not reveal
  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 60*60*1000);
  await PasswordReset.create({ userId: user._id, token, expiresAt });
  // TODO: send email with token link
  res.json({ ok: true });
});

// Confirm reset
router.post("/reset", async (req,res) => {
  const { token, password } = req.body;
  const rec = await PasswordReset.findOne({ token });
  if (!rec || rec.expiresAt < new Date()) return res.status(400).json({ error: "Invalid token" });
  const hash = await bcrypt.hash(password, 10);
  await User.updateOne({ _id: rec.userId }, { $set: { passwordHash: hash } });
  res.json({ ok: true });
});

module.exports = router;
