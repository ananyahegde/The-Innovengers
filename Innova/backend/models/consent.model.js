const mongoose = require('mongoose');

const consentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  purpose: {
    type: String,
    enum: [
      'essential', 'functional', 'analytics', 'personalization',
      'marketing', 'third_party', 'research', 'legal', 'location'
    ]
  },
  granted: Boolean,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consent', consentSchema);
