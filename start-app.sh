#!/bin/bash

# Navigate to the app directory - Updated with your specific path
APP_DIR="/Users/cobibean/DEV/image-compressor-tool"

# Check if the directory exists
if [ ! -d "$APP_DIR" ]; then
  echo "Error: Application directory not found at $APP_DIR"
  echo "Please update the APP_DIR variable in this script to point to your local repository"
  exit 1
fi

# Navigate to the application directory
cd "$APP_DIR"

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
echo "Starting Cobi Compression Tool..."
npm start

# This will open your default browser automatically