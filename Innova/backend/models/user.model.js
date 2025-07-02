const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  credentialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Credential' }
});

module.exports = mongoose.model('User', userSchema);
