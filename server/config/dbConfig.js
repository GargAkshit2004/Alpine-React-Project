//This file will handle the MongoDB connection logic.
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  agreedToTerms: { type: Boolean, required: true },
});

module.exports = mongoose.model('SubscriptionNewsletter', subscriptionSchema);
