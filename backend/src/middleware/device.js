const crypto = require("crypto");
module.exports.fingerprint = (req) => {
  const raw = [
    req.ip,
    req.headers["user-agent"] || "",
    req.headers["accept-language"] || ""
  ].join("|");
  return crypto.createHash("sha256").update(raw).digest("hex");
};
