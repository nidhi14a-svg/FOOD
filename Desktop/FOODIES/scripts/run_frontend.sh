#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/../frontend" || exit 1
npm start
