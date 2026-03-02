const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';

// ─────────────────────────────────────────────────────────────────────────────
// ENCRYPTION_KEY — lives here in the app code, NOT in Azure App Settings.
// An attacker with only Azure access sees the encrypted EMAIL_PASS but cannot
// decrypt it without this key. They need both the Azure value AND this file.
//
// To generate a new key:
//   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
//
// Then run the encrypt script to get the encrypted EMAIL_PASS for Azure:
//   ./scripts/encrypt-secret.sh --use-key <key_below> "your_gmail_app_password"
//
// Local .env can override this key for dev (ENCRYPTION_KEY=xxx in .env).
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTION_KEY = 'Poda-antha-aandavaney-s3n-pakkam';

function getKey() {
  return process.env.ENCRYPTION_KEY || PRODUCTION_KEY;
}

/**
 * Decrypts a value encrypted by scripts/encrypt-secret.sh.
 * Expected format: "<16-byte-iv-hex>:<ciphertext-hex>"
 */
function decrypt(encryptedText) {
  const keyHex = getKey();
  const key = Buffer.from(keyHex, 'hex');
  if (key.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be 64 hex characters (32 bytes)');
  }

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
