/**
 * Input sanitization utilities.
 * Strips HTML/script tags and enforces field length limits to protect
 * against XSS injection in outgoing emails and log output.
 */

function stripHtml(str) {
  return str
    .replace(/<[^>]*>/g, '')           // remove HTML tags
    .replace(/javascript:/gi, '')       // remove javascript: protocol
    .replace(/on\w+\s*=/gi, '')         // remove inline event handlers (onclick=, onerror=, etc.)
    .trim();
}

/**
 * Sanitize a plain text field: strip HTML tags and cap length.
 * @param {*} value  Raw input value
 * @param {number} maxLength  Max allowed characters
 * @returns {string}
 */
function sanitizeText(value, maxLength) {
  if (typeof value !== 'string') return '';
  return stripHtml(value).slice(0, maxLength);
}

/**
 * Sanitize an email address: lowercase, trim, cap at 254 chars (RFC 5321).
 * @param {*} value  Raw input value
 * @returns {string}
 */
function sanitizeEmail(value) {
  if (typeof value !== 'string') return '';
  return value.trim().toLowerCase().slice(0, 254);
}

module.exports = { sanitizeText, sanitizeEmail };
