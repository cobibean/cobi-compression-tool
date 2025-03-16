#!/bin/bash

# This file acts as a macOS desktop launcher
# You can double-click this file in Finder to launch the app

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Execute the start script
bash "$SCRIPT_DIR/start-app.sh"