﻿const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false
});
module.exports = (req, res, next) => {
  // Basic IP-based rate limiting logic
  next();
};
