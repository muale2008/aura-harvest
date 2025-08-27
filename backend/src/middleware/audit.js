const AuditLog = require("../models/AuditLog");
module.exports.audit = (action) => async (req, _res, next) => {
  try {
    await AuditLog.create({ action, actor: req.user?.id, details: { body: req.body, params: req.params, ip: req.ip } });
  } catch {}
  next();
};
