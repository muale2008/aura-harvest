const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (_req,res) => {
  const list = await User.find({}, { email: 1, referralProgress: 1 })
    .sort({ referralProgress: -1 })
    .limit(50);
  res.json(list);
});

module.exports = router;
