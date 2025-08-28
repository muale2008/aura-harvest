import express from 'express'
import mongoose from 'mongoose'
import referralRoutes from './routes/referralRoutes.js'


require("dotenv").config({ path: require("path").join(process.cwd(), "..", "config", ".env") });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { rateLimiter } = require("./middleware/rateLimit");
const { seed } = require("./utils/seed");

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(rateLimiter);

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/auraharvest";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI).then(async () => {
  console.log("Mongo connected");
  await seed();
}).catch(err => {
  console.error("Mongo error", err);
  process.exit(1);
});

// Routes
app.get("/api/health", (_req,res)=>res.json({ ok:true, ts: Date.now() }));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/verification", require("./routes/verification"));
app.use("/api/password", require("./routes/password"));
app.use("/api/invites", require("./routes/invites"));
app.use("/api/referral", require("./routes/referral"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/search", require("./routes/search"));
app.use("/api/favorites", require("./routes/favorites"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/leaderboard", require("./routes/leaderboard"));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => console.log(`API on :${PORT}`));
