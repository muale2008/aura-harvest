const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: 'user' },
  referralCode: String,
  referredBy: String,
  verified: Boolean,
});

module.exports = mongoose.model('User', userSchema);