#!/bin/bash
# ─────────────────────────────────────────────────────────────
# push-env-to-azure.sh
# Reads EMAIL_* variables from backend/.env and pushes them to
# an Azure App Service as Application Settings.
#
# Prerequisites:
#   - Azure CLI installed and logged in (az login)
#
# Usage:
#   ./scripts/push-env-to-azure.sh <app-name> <resource-group>
#
# Example:
#   ./scripts/push-env-to-azure.sh s3n-website-APIs all-apps-backend-API-rg
# ─────────────────────────────────────────────────────────────

set -e

APP_NAME="$1"
RESOURCE_GROUP="$2"
ENV_FILE="$(dirname "$0")/../backend/.env"

# ── Validate inputs ──────────────────────────────────────────
if [ -z "$APP_NAME" ] || [ -z "$RESOURCE_GROUP" ]; then
  echo "Usage: ./scripts/push-env-to-azure.sh <app-name> <resource-group>"
  echo ""
  echo "Example:"
  echo "  ./scripts/push-env-to-azure.sh s3n-website-APIs all-apps-backend-API-rg"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: backend/.env not found at $ENV_FILE"
  exit 1
fi

# ── Read values from .env ────────────────────────────────────
read_env() {
  grep -E "^$1=" "$ENV_FILE" | cut -d '=' -f2- | tr -d '\r'
}

EMAIL_HOST=$(read_env EMAIL_HOST)
EMAIL_PORT=$(read_env EMAIL_PORT)
EMAIL_USER=$(read_env EMAIL_USER)
EMAIL_PASS=$(read_env EMAIL_PASS)
EMAIL_TO=$(read_env EMAIL_TO)

# ── Validate none are empty ──────────────────────────────────
MISSING=()
[ -z "$EMAIL_HOST" ] && MISSING+=("EMAIL_HOST")
[ -z "$EMAIL_PORT" ] && MISSING+=("EMAIL_PORT")
[ -z "$EMAIL_USER" ] && MISSING+=("EMAIL_USER")
[ -z "$EMAIL_PASS" ] && MISSING+=("EMAIL_PASS")
[ -z "$EMAIL_TO"   ] && MISSING+=("EMAIL_TO")

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "Error: The following values are empty in backend/.env:"
  for key in "${MISSING[@]}"; do
    echo "  - $key"
  done
  echo ""
  echo "Fill them in before running this script."
  exit 1
fi

# ── Preview ──────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  App:            $APP_NAME"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  Settings to push:"
echo "    EMAIL_HOST  = $EMAIL_HOST"
echo "    EMAIL_PORT  = $EMAIL_PORT"
echo "    EMAIL_USER  = $EMAIL_USER"
echo "    EMAIL_PASS  = ${EMAIL_PASS:0:6}****"
echo "    EMAIL_TO    = $EMAIL_TO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -r -p "Proceed? (y/n): " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo "Aborted."
  exit 0
fi

# ── Push to Azure ────────────────────────────────────────────
echo ""
echo "Pushing to Azure App Settings..."

az webapp config appsettings set \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --settings \
    EMAIL_HOST="$EMAIL_HOST" \
    EMAIL_PORT="$EMAIL_PORT" \
    EMAIL_USER="$EMAIL_USER" \
    EMAIL_PASS="$EMAIL_PASS" \
    EMAIL_TO="$EMAIL_TO" \
  --output table

echo ""
echo "✅ Done. Azure App Service will restart automatically to apply the new settings."
echo ""
