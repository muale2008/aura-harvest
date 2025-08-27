const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { email, password, inviterCode } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: "Email exists" });
  const passwordHash = await bcrypt.hash(password, 10);
  const doc = { email, passwordHash, inviteCode: uuidv4(), referralUnlock: false };
  if (inviterCode) {
    const inviter = await User.findOne({ inviteCode: inviterCode });
    if (inviter) doc.inviterUserId = inviter._id;
  }
  const user = await User.create(doc);
  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user._id, email: user.email, adFreeSlots: user.adFreeSlots, referralUnlock: user.referralUnlock } });
});

router.post("/login", async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user._id, email: user.email, adFreeSlots: user.adFreeSlots, referralUnlock: user.referralUnlock, adminOverride: user.adminOverride, adminFrequency: user.adminFrequency } });
});

router.get("/me", async (req,res) => {
  try {
    const h = req.headers.authorization || "";
    const token = h.startsWith("Bearer ") ? h.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const u = await User.findById(payload.id);
    if (!u) return res.status(404).json({ error: "Not found" });
    res.json({ id: u._id, email: u.email, adFreeSlots: u.adFreeSlots, referralUnlock: u.referralUnlock, adminOverride: u.adminOverride, adminFrequency: u.adminFrequency, inviteCode: u.inviteCode });
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = router;
