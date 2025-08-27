const router = require("express").Router();
const AdConfig = require("../models/AdConfig");
const Announcement = require("../models/Announcement");
const { authRequired } = require("../middleware/auth");
const { audit } = require("../middleware/audit");

function requireAdmin(req,res,next){
  // simple role check
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
}

router.post("/ad-config", authRequired, requireAdmin, audit("admin_ad_config"), async (req,res) => {
  const { defaultFrequency, perJobType } = req.body;
  const cfg = await AdConfig.create({ defaultFrequency, perJobType });
  res.json(cfg);
});

router.post("/announcement", authRequired, requireAdmin, audit("admin_announcement"), async (req,res) => {
  const { message, markdown, startsAt, endsAt } = req.body;
  const a = await (new Announcement({ message, markdown, startsAt, endsAt })).save();
  res.json(a);
});

router.get("/announcement", authRequired, requireAdmin, async (_req,res) => {
  const now = new Date();
  const list = await Announcement.find({
    $and: [
      { $or: [{ startsAt: { $lte: now } }, { startsAt: null }, { startsAt: { $exists: false } }] },
      { $or: [{ endsAt: null }, { endsAt: { $gte: now } }, { endsAt: { $exists: false } }] }
    ]
  }).sort({ createdAt: -1 }).limit(10);
  res.json(list);
});

module.exports = router;
