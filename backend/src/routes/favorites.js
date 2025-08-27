const router = require("express").Router();
const { authRequired } = require("../middleware/auth");
const User = require("../models/User");

router.get("/", authRequired, async (req,res) => {
  const u = await User.findById(req.user.id).populate("favorites");
  res.json(u.favorites || []);
});
router.post("/", authRequired, async (req,res) => {
  const { jobId } = req.body;
  await User.updateOne({ _id: req.user.id }, { $addToSet: { favorites: jobId } });
  res.json({ ok: true });
});
router.delete("/:jobId", authRequired, async (req,res) => {
  await User.updateOne({ _id: req.user.id }, { $pull: { favorites: req.params.jobId } });
  res.json({ ok: true });
});

module.exports = router;
