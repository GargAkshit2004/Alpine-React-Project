//This file contains the Mongoose model for storing emails in Subscription_newsletter.EmailId.

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email entries
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Allow special characters and enforce valid email
  },
}, { collection: 'Subscription_newsletter.EmailId' }); // Use the specific collection name

module.exports = mongoose.model('SubscriptionNewsletter', subscriptionSchema);

