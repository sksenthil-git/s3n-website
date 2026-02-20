#!/bin/bash
# Deploy script - build frontend and push to remote

set -e

echo "═══════════════════════════════════════════════════════"
echo "  Deploying S3N Website"
echo "═══════════════════════════════════════════════════════"

ROOT="$(dirname "$0")/.."

# Build frontend
echo "🔨 Building frontend..."
bash "$ROOT/scripts/build.sh"

# Git commit built dist (if deploying via git)
cd "$ROOT"
echo ""
echo "📋 Current git status:"
git status --short

echo ""
echo "✅ Ready to deploy!"
echo "   - Frontend build is in frontend/dist/"
echo "   - Push to your hosting provider (Netlify, Vercel, Azure, etc.)"
echo ""
