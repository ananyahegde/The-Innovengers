const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  action: String, // e.g., 'viewed_product', 'shared_data'
  accessedBy: String, // internal_service, 3rd_party_name, etc.
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
