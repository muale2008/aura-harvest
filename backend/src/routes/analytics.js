const router = require("express").Router();
router.post("/event", async (req,res) => {
  console.log("ANALYTICS", JSON.stringify({ ts: Date.now(), ...req.body }));
  res.json({ ok: true });
});
module.exports = router;
