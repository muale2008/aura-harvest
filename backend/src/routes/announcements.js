const router = require("express").Router();
const Announcement = require("../models/Announcement");

router.get("/", async (_req,res) => {
  const now = new Date();
  const list = await Announcement.find({
    $and: [
      { $or: [{ startsAt: { $lte: now } }, { startsAt: null }, { startsAt: { $exists: false } }] },
      { $or: [{ endsAt: null }, { endsAt: { $gte: now } }, { endsAt: { $exists: false } }] }
    ]
  }).sort({ createdAt: -1 }).limit(5);
  res.json(list);
});

module.exports = router;
