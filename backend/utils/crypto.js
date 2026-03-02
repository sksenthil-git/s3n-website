const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';

/**
 * Decrypts a value encrypted by scripts/encrypt-secret.sh.
 * Expected format: "<16-byte-iv-hex>:<ciphertext-hex>"
 *
 * Requires ENCRYPTION_KEY env var (64 hex characters = 32 bytes).
 */
function decrypt(encryptedText) {
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex) {
    throw new Error('ENCRYPTION_KEY environment variable is not set');
  }

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
