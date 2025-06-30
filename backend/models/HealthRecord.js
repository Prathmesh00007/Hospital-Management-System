const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
