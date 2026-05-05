#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/../backend" || exit 1
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
