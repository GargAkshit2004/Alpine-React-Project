// server.js
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

// Initialize dotenv to access environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cors()); // Enable Cross-Origin Requests (CORS)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// MongoDB Schema for storing emails in the Subscription_newsletter collection
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  agreedToTerms: { type: Boolean, required: true }
});

const Email = mongoose.model('EmailId', emailSchema, 'Subscription_newsletter'); // Model for Subscription_newsletter.EmailId

// Nodemailer transport configuration (use App Password if 2FA enabled)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alpinepremiumflorist2022@gmail.com',  // Your email
    pass: 'mavogqtdyzpfblys' // Use the App Password generated from Gmail settings
  }
});

// Function to send the sample newsletter email
const sendNewsletter = async (email) => {
  const mailOptions = {
    from: 'alpinepremiumflorist2022@gmail.com',
    to: email,
    subject: 'Welcome to Our Newsletter!',
    html: `
      <h1>Welcome!</h1>
      <p>Thank you for subscribing to our newsletter. We are excited to keep you updated!</p>
      <p>Stay tuned for the latest news.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Newsletter sent to: ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Route to handle subscription logic
app.post('/subscribe', async (req, res) => {
  const { email, agreedToTerms } = req.body;

  // Enhanced email validation regex (allowing special characters such as ., !, +, etc.)
  const emailRegex = /^[a-zA-Z0-9._!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format. Please ensure the email is structured correctly with allowed special characters.' });
  }

  // Check if the user has agreed to the terms
  if (!agreedToTerms) {
    return res.status(400).json({ message: 'You must agree to the terms before subscribing.' });
  }

  try {
    // Check if the email already exists
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'This email is already subscribed.' });
    }

    // Save the email in the database
    const newEmail = new Email({ email, agreedToTerms });
    await newEmail.save();

    // Send the newsletter to the newly added user
    await sendNewsletter(email);

    // Respond with success message
    return res.status(201).json({ message: 'Subscription successful and newsletter sent!' });
  } catch (error) {
    console.error('Error during subscription or sending email:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
