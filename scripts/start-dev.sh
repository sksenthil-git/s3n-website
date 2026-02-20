#!/bin/bash
# Start frontend and backend concurrently in development mode

ROOT="$(dirname "$0")/.."

echo "═══════════════════════════════════════════════════════"
echo "  Starting S3N Website (Development)"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:3001"
echo "═══════════════════════════════════════════════════════"
echo ""

# Start backend in background
echo "🚀 Starting backend..."
cd "$ROOT/backend" && npm install --silent && npm run dev &
BACKEND_PID=$!

# Brief pause so backend starts first
sleep 2

# Start frontend
echo "🎨 Starting frontend..."
cd "$ROOT/frontend" && npm install --silent && npm run dev &
FRONTEND_PID=$!

# Trap Ctrl+C to kill both
trap "echo ''; echo '👋 Shutting down...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT SIGTERM

wait
