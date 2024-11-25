const nodemailer = require('nodemailer');

// Function to send a sample newsletter
const sendNewsletter = async (recipientEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alpinepremiumflorist2022@gmail.com', // Replace with actual email
        pass: 'GHAG@Alpine', // Replace with actual app password
      },
    });

    const mailOptions = {
      from: 'alpinepremiumflorist2022@gmail.com',
      to: recipientEmail,
      subject: 'Welcome to Alpine Newsletters!',
      html: `<h1>Welcome to Alpine</h1>
             <p>Thank you for subscribing to Alpine newsletters. Stay tuned for exciting updates!</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Newsletter sent to: ${recipientEmail}`);
    return { success: true, message: `Newsletter sent to ${recipientEmail}` };
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Failed to send newsletter');
  }
};

module.exports = sendNewsletter;
