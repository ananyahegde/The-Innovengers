const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const credentialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  password: { type: String, required: true }
});

// hash password before saving
credentialSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Credential', credentialSchema);
