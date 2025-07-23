const sendEmail = require('../utils/sendEmail');

exports.sendTestEmail = async (req, res) => {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'Test Email',
      text: '✅ This is a test email from your Car Rental API system!',
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
