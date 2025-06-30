const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  healthRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HealthRecord' }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

module.exports = mongoose.model('User', userSchema);
