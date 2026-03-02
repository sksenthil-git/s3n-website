#!/bin/bash
# ─────────────────────────────────────────────────────────────
# encrypt-secret.sh
# Encrypts a plain-text value using AES-256-CBC (Node.js crypto).
# The encrypted output is stored in Azure App Settings.
# The ENCRYPTION_KEY is stored in backend/utils/crypto.js (NOT in Azure).
# An attacker needs BOTH to decrypt — Azure value alone is useless.
#
# Usage:
#   1. First time – generate a key AND encrypt a value:
#        ./scripts/encrypt-secret.sh --gen-key <plain_text>
#      → Copy the key into PRODUCTION_KEY in backend/utils/crypto.js
#      → Copy the encrypted value into Azure App Settings as EMAIL_PASS
#
#   2. Re-encrypt with existing key from crypto.js:
#        ENCRYPTION_KEY=<your_64_char_hex_key> ./scripts/encrypt-secret.sh <plain_text>
# ─────────────────────────────────────────────────────────────

set -e

GEN_KEY=false
PLAIN_TEXT=""

# Parse arguments
if [ "$1" = "--gen-key" ]; then
  GEN_KEY=true
  PLAIN_TEXT="$2"
else
  PLAIN_TEXT="$1"
fi

if [ -z "$PLAIN_TEXT" ]; then
  echo "Usage:"
  echo "  First time:  ./scripts/encrypt-secret.sh --gen-key <plain_text>"
  echo "  Reuse key:   ENCRYPTION_KEY=<hex_key> ./scripts/encrypt-secret.sh <plain_text>"
  exit 1
fi

# Generate key if requested, otherwise require it from env
if [ "$GEN_KEY" = true ]; then
  ENCRYPTION_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  ENCRYPTION_KEY (save this — you cannot recover it later):"
  echo "  $ENCRYPTION_KEY"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

if [ -z "$ENCRYPTION_KEY" ]; then
  echo "Error: ENCRYPTION_KEY is not set."
  echo "Run with --gen-key to generate one, or export ENCRYPTION_KEY=<hex_key> first."
  exit 1
fi

# Encrypt using Node.js crypto (AES-256-CBC, random IV prepended to output)
ENCRYPTED=$(node -e "
const crypto = require('crypto');
const key = Buffer.from('$ENCRYPTION_KEY', 'hex');
if (key.length !== 32) { console.error('ENCRYPTION_KEY must be 64 hex chars (32 bytes)'); process.exit(1); }
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
