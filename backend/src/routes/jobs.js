const router = require("express").Router();
const Job = require("../models/Job");
const UserActivity = require("../models/UserActivity");
const { authRequired } = require("../middleware/auth");
const { trackReferredCompletion } = require("../services/referralService");

// list
router.get("/", async (_req,res) => {
  const jobs = await Job.find({ status: "published" }).sort({ createdAt: -1 }).limit(100);
  res.json(jobs);
});

// detail
router.get("/:id", async (req,res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: "Not found" });
  res.json(job);
});

// composer (basic)
router.post("/", authRequired, async (req,res) => {
  const { title, description, tags, adIntensity } = req.body;
  const job = await Job.create({
    title, description, tags,
    adIntensity: adIntensity || "standard",
    status: "published",
    versions: [{ title, description, tags, versionNote: "initial" }]
  });
  res.json(job);
});

// repost (version tracker)
router.post("/:id/repost", authRequired, async (req,res) => {
  const { versionNote } = req.body;
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: "Not found" });
  job.versions.push({ title: job.title, description: job.description, tags: job.tags, versionNote: versionNote || "repost" });
  job.repostHistory.push({ at: new Date(), by: req.user.id, note: versionNote || "" });
  await job.save();
  res.json(job);
});

// completion tracker (links to referrals)
router.post("/:id/complete", authRequired, async (req,res) => {
  const jobId = req.params.id;
  await UserActivity.create({ userId: req.user.id, type: "job_completion", jobId });
  await trackReferredCompletion(req.user.id);
  res.json({ ok: true });
});

module.exports = router;
