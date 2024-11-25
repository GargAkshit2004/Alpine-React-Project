const SubscriptionNewsletter = require('../models/subscriptionModel');
const nodemailer = require('nodemailer');

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // Save email to the database
    const subscription = new SubscriptionNewsletter({ email });
    await subscription.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alpinepremiumflorist2022@gmail.com',
        pass: 'GHAG@Alpine', // Use app-specific password
      },
    });

    // Define email content
    const mailOptions = {
      from: 'alpinepremiumflorist2022@gmail.com',
      to: email,
      subject: 'Welcome to Alpine Newsletter',
      text: 'Thank you for subscribing to Alpine Premium Florist Newsletter!',
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Subscription successful, and newsletter sent!' });
  } catch (error) {
    console.error('Error during subscription:', error);

    if (error.code === 11000) {
      return res.status(409).json({ message: `Email ${req.body.email} already exists.` });
    }

    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

module.exports = { subscribe };
