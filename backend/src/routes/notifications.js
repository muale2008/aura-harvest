const router = require("express").Router();
const { authRequired } = require("../middleware/auth");
const Notification = require("../models/Notification");

router.get("/", authRequired, async (req,res) => {
  const list = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50);
  res.json(list);
});
router.post("/", authRequired, async (req,res) => {
  const { title, body } = req.body;
  const n = await Notification.create({ userId: req.user.id, title, body });
  res.json(n);
});

module.exports = router;
