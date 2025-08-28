exports.trackReferral = async (req, res) => {
  const { inviterId, inviteeId } = req.body;
  // Check for abuse, cooldowns, etc.
  const referral = new Referral({ inviter: inviterId, invitee: inviteeId });
  await referral.save();
  res.status(201).json({ message: 'Referral tracked' });
};