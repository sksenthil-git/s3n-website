const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config/app.config');
const { contactLimiter } = require('../middleware/rateLimiter');

// POST /api/contact
router.post('/', contactLimiter, async (req, res) => {
  const { firstName, lastName, email, company, phone, service, budget, timeline, message, newsletter } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  try {
    if (config.EMAIL_USER && config.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        secure: false,
        auth: { user: config.EMAIL_USER, pass: config.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"S3N Website" <${config.EMAIL_USER}>`,
        to: config.EMAIL_TO,
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Service Interest:</strong> ${service || 'N/A'}</p>
          <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
          <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
          <p><strong>Newsletter:</strong> ${newsletter ? 'Yes' : 'No'}</p>
          <hr/>
          <h3>Message:</h3>
          <p>${message}</p>
        `,
      });
    } else {
      // Log to console in development when email is not configured
      console.log('Contact form submission (email not configured):', { firstName, lastName, email, message });
    }

    res.json({ success: true, message: 'Thank you! Your message has been sent successfully.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
