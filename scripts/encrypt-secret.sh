#!/bin/bash
# ─────────────────────────────────────────────────────────────
# encrypt-secret.sh
# Reads PRODUCTION_KEY from backend/utils/crypto.js and uses it
# to encrypt a plain-text value. Store the output in Azure App Settings.
#
# Usage:
#   ./scripts/encrypt-secret.sh <plain_text>
#
# Example:
#   ./scripts/encrypt-secret.sh "your_gmail_app_password"
# ─────────────────────────────────────────────────────────────

set -e

PLAIN_TEXT="$1"
CRYPTO_FILE="$(dirname "$0")/../backend/utils/crypto.js"

if [ -z "$PLAIN_TEXT" ]; then
  echo "Usage: ./scripts/encrypt-secret.sh <plain_text>"
  exit 1
fi

if [ ! -f "$CRYPTO_FILE" ]; then
  echo "Error: Cannot find backend/utils/crypto.js"
  exit 1
fi

# Encrypt using the same PRODUCTION_KEY and SHA-256 key derivation as crypto.js
ENCRYPTED=$(node -e "
const crypto = require('crypto');
const fs = require('fs');

const src = fs.readFileSync('$CRYPTO_FILE', 'utf8');
const match = src.match(/PRODUCTION_KEY\s*=\s*['\"]([^'\"]+)['\"]/);
if (!match) { console.error('PRODUCTION_KEY not found in crypto.js'); process.exit(1); }

const passphrase = match[1];
const key = crypto.createHash('sha256').update(passphrase).digest();
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let enc = cipher.update('$PLAIN_TEXT', 'utf8', 'hex');
enc += cipher.final('hex');
console.log(iv.toString('hex') + ':' + enc);
")

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ENCRYPTED VALUE (store this as EMAIL_PASS in Azure):"
echo "  $ENCRYPTED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
