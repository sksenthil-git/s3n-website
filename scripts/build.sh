#!/bin/bash
# Build the frontend for production

set -e

echo "═══════════════════════════════════════════════════════"
echo "  Building S3N Website Frontend"
echo "═══════════════════════════════════════════════════════"

cd "$(dirname "$0")/../frontend"

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building for production..."
npm run build

echo ""
echo "✅ Build complete! Output: frontend/dist/"
echo ""
