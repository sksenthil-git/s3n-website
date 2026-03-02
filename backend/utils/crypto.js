const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTION_KEY — lives here in the app code, NOT in Azure App Settings.
// An attacker with only Azure access sees the encrypted EMAIL_PASS but cannot
// decrypt it without this key. They need both the Azure value AND this file.
//
// Can be any passphrase — SHA-256 is used to derive a consistent 32-byte key.
// Run the encrypt script to produce the encrypted value for Azure:
//   ./scripts/encrypt-secret.sh "your_gmail_app_password"
//
// Local .env can override this key for dev (ENCRYPTION_KEY=<passphrase> in .env).
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTION_KEY = 'Poda-antha-aandavaney-s3n-pakkam';

// Derives a 32-byte AES key from any passphrase using SHA-256.
function deriveKey(passphrase) {
  return crypto.createHash('sha256').update(passphrase).digest();
}

function getKey() {
  return deriveKey(process.env.ENCRYPTION_KEY || PRODUCTION_KEY);
}

/**
 * Decrypts a value encrypted by scripts/encrypt-secret.sh.
 * Expected format: "<16-byte-iv-hex>:<ciphertext-hex>"
 */
function decrypt(encryptedText) {
  const key = getKey();
  const [ivHex, cipherHex] = encryptedText.split(':');
  if (!ivHex || !cipherHex) {
    throw new Error('Invalid encrypted value format. Expected "<iv>:<ciphertext>"');
  }
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(cipherHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * Returns the decrypted value if the string looks encrypted (contains ":"),
 * otherwise returns it as-is. Allows local .env to still use plain text.
 */
function decryptIfNeeded(value) {
  if (!value) return value;
  return value.includes(':') ? decrypt(value) : value;
}

module.exports = { decrypt, decryptIfNeeded };
