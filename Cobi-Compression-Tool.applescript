-- Cobi Image Compression Tool Launcher
-- To use this:
-- 1. Open this file with Script Editor
-- 2. Choose "Export..." from File menu
-- 3. Select "Application" as File Format
-- 4. Save to Desktop or Applications folder
-- 5. This creates a clickable app with a custom icon that launches the tool

tell application "Terminal"
	-- Replace with your actual path
	do script "cd /Users/cobibean/DEV/image-compressor-tool && bash start-app.sh"
end tell