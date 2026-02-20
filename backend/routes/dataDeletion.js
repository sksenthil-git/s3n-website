const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config/app.config');
const { contactLimiter } = require('../middleware/rateLimiter');

const VALID_APPS = [
  'Deal Search (deal-search.com)',
  'Chit Collection App',
  'Rent Collection App',
];

// POST /api/data-deletion
router.post('/', contactLimiter, async (req, res) => {
  const { email, app } = req.body;

  if (!email || !app) {
    return res.status(400).json({ success: false, message: 'Email address and app selection are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  if (!VALID_APPS.includes(app)) {
    return res.status(400).json({ success: false, message: 'Invalid app selection.' });
  }

  try {
    if (config.EMAIL_USER && config.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        secure: false,
        auth: { user: config.EMAIL_USER, pass: config.EMAIL_PASS },
      });

      // Notify admin
      await transporter.sendMail({
        from: `"S3N Website" <${config.EMAIL_USER}>`,
        to: config.EMAIL_TO,
        subject: `[DATA DELETION REQUEST] ${app} — ${email}`,
        html: `
          <h2>Data Deletion Request</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr>
              <td style="padding:8px;border:1px solid #ddd;font-weight:bold">User Email</td>
              <td style="padding:8px;border:1px solid #ddd">${email}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #ddd;font-weight:bold">App</td>
              <td style="padding:8px;border:1px solid #ddd">${app}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Submitted At</td>
              <td style="padding:8px;border:1px solid #ddd">${new Date().toUTCString()}</td>
            </tr>
          </table>
          <p style="margin-top:20px;color:#dc2626;font-weight:bold">
            Action required: Delete all data for this user from ${app} within 30 days.
          </p>
        `,
      });

      // Acknowledge user
      await transporter.sendMail({
        from: `"S3N Technologies" <${config.EMAIL_USER}>`,
        to: email,
        subject: `Data Deletion Request Received — ${app}`,
        html: `
          <h2>We've received your data deletion request</h2>
          <p>Hello,</p>
          <p>We have received your request to delete your account and personal data from <strong>${app}</strong>.</p>
          <p>Your request will be processed within <strong>30 days</strong>. You will receive a confirmation email once the deletion is complete.</p>
          <p>If you did not make this request or wish to cancel it, please contact us immediately at <a href="mailto:${config.EMAIL_TO}">${config.EMAIL_TO}</a>.</p>
          <br/>
          <p>— S3N Technologies Team</p>
        `,
      });
    } else {
      console.log('Data deletion request (email not configured):', { email, app, timestamp: new Date().toISOString() });
    }

    res.json({ success: true, message: 'Your deletion request has been submitted. You will receive a confirmation email within 30 days.' });
  } catch (error) {
    console.error('Data deletion email error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit request. Please try again.' });
  }
});

module.exports = router;
