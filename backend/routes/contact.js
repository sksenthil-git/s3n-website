const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config/app.config');
const { contactLimiter } = require('../middleware/rateLimiter');
const { sanitizeText, sanitizeEmail } = require('../utils/sanitize');

// POST /api/contact
router.post('/', contactLimiter, async (req, res) => {
  const name     = sanitizeText(req.body.name,     100);
  const email    = sanitizeEmail(req.body.email);
  const company  = sanitizeText(req.body.company,  100);
  const phone    = sanitizeText(req.body.phone,     30);
  const service  = sanitizeText(req.body.service,   50);
  const budget   = sanitizeText(req.body.budget,    50);
  const timeline = sanitizeText(req.body.timeline,  50);
  const message  = sanitizeText(req.body.message, 2000);
  // console.log('[contact] Request received:', { name, email, company, service });

  if (!name || !email || !message) {
    // console.log('[contact] Validation failed: missing required fields');
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // console.log('[contact] Validation failed: invalid email format:', email);
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  try {
    if (config.EMAIL_USER && config.EMAIL_PASS) {
      // console.log('[contact] Email credentials present — creating transporter');
      // console.log('[contact] SMTP config:', { host: config.EMAIL_HOST, port: config.EMAIL_PORT, user: config.EMAIL_USER });
      const transporter = nodemailer.createTransport({
        host: config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        secure: false,
        auth: { user: config.EMAIL_USER, pass: config.EMAIL_PASS },
      });

      // console.log('[contact] Sending admin notification to:', config.EMAIL_TO);
      // Notify admin
      await transporter.sendMail({
        from: `"S3N Website" <${config.EMAIL_USER}>`,
        to: config.EMAIL_TO,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Service Interest:</strong> ${service || 'N/A'}</p>
          <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
          <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
          <hr/>
          <h3>Message:</h3>
          <p>${message}</p>
        `,
      });

      // console.log('[contact] Admin notification sent. Sending acknowledgement to:', email);
      // Acknowledge user
      await transporter.sendMail({
        from: `"S3N Technologies" <${config.EMAIL_USER}>`,
        to: email,
        subject: 'We received your message — S3N Technologies',
        html: `
          <h2>Thank you for reaching out, ${name}!</h2>
          <p>We've received your message and will get back to you within <strong>24 hours</strong>.</p>
          <p>In the meantime, feel free to explore our services at <a href="${config.FRONTEND_URL}">${config.FRONTEND_URL}</a>.</p>
          <br/>
          <p>— S3N Technologies Team</p>
        `,
      });
      // console.log('[contact] Acknowledgement sent. All emails delivered successfully.');
    } else {
      // console.warn('[contact] Email credentials missing — EMAIL_USER:', config.EMAIL_USER || '(empty)', '| EMAIL_PASS:', config.EMAIL_PASS ? '(set)' : '(empty)');
      // console.log('[contact] Skipping email. Form data:', { name, email, message });
    }

    res.json({ success: true, message: 'Thank you! Your message has been sent successfully.' });
  } catch (error) {
    // console.error('[contact] Email send failed:', error.message);
    // console.error('[contact] Full error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
