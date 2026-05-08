#!/usr/bin/env bash
set -e

echo "Installing backend dependencies..."
python -m pip install fastapi uvicorn motor bcrypt python-jose[cryptography] python-dateutil

echo "Installing frontend dependencies..."
cd "$(dirname "$0")/../frontend" || exit 1
npm install

echo "Setup complete. Use scripts/run_backend.sh and scripts/run_frontend.sh to start services."
