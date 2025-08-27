const router = require("express").Router();
const { authRequired } = require("../middleware/auth");
const User = require("../models/User");

router.get("/mine", authRequired, async (req,res) => {
  const u = await User.findById(req.user.id);
  res.json({ inviteCode: u.inviteCode });
});

module.exports = router;
