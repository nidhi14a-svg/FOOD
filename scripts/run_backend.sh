#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.." || exit 1
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8001
