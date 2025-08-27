const router = require("express").Router();
const Job = require("../models/Job");

router.get("/", async (req,res) => {
  const { q = "", tags = "" } = req.query;
  const tagList = (""+tags).split(",").filter(Boolean);
  const cond = { status: "published" };
  if (q) cond.$text = { $search: q };
  if (tagList.length) cond.tags = { $in: tagList };
  const jobs = await Job.find(cond).limit(100);
  res.json(jobs);
});

module.exports = router;
