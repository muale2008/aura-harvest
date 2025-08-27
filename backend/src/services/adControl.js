function resolveFrequency(user, job) {
  if (user?.adminOverride) return "none";
  if (user?.adFreeSlots > 0 || user?.referralUnlock) return "minimal";
  if (user?.adminFrequency) return user.adminFrequency;
  return job?.adIntensity || "standard";
}
module.exports = { resolveFrequency };
