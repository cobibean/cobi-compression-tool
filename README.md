# Cobi Compression Tool

A simple and lightweight image compression tool that lets users upload JPEG or PNG images and compress them to just under 1 MB (999 KB). This tool runs locally on your machine and provides a convenient way to reduce image file sizes without sacrificing too much quality.

## Features

- Upload JPEG or PNG images
- Compress images to under 1 MB (999 KB)
- Automatic image quality adjustment based on original file size
- Side-by-side preview of original and compressed images
- Display of file size reduction and compression ratio
- Download compressed images with a single click
- Responsive design for both desktop and mobile devices

## Installation

1. Clone this repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Usage

1. Start the development server:

```bash
npm start
```

2. Open [http://localhost:3000](http://localhost:3000) in your web browser
3. Click "Select Image" to upload a JPEG or PNG image
4. Click "Compress Image" to compress the uploaded image
5. View the side-by-side comparison and compression details
6. Click "Download Compressed Image" to save the compressed image to your device

## Creating a Desktop Shortcut (Quick Launch)

To launch the application without opening VS Code or Cursor, you can use the included shortcut files:

### For macOS:

1. Clone the repository to your local machine if you haven't already
2. Open Terminal and navigate to the repository folder
3. Make the launch scripts executable:

```bash
chmod +x start-app.sh
chmod +x Cobi-Compression-Tool.command
```

4. Modify the `start-app.sh` file if needed to point to your actual repository location (edit the `APP_DIR` variable)
5. You can now launch the application by double-clicking the `Cobi-Compression-Tool.command` file in Finder
6. For even easier access, you can create an alias of this file on your Desktop:
   - Right-click on `Cobi-Compression-Tool.command`
   - Hold the Option (⌥) key and select "Make Alias"
   - Drag the alias to your Desktop or Dock

### For Windows:

If you're using Windows, you can create a `.bat` file shortcut:

1. Create a new text file on your desktop
2. Add the following content (adjust the paths as needed):

```batch
@echo off
cd "C:\path\to\your\repo"
npm start
```

3. Save the file with a `.bat` extension, like `Start-Cobi-Tool.bat`
4. Double-click this file to launch the application

## Build for Production

To build the app for production, run:

```bash
npm run build
```

This creates a `build` directory with optimized and minified files ready for deployment.

## How It Works

The application uses the `browser-image-compression` library to perform client-side image compression. The compression algorithm:

1. Analyzes the uploaded image's size and format
2. Sets an initial compression quality based on the original file size
3. Applies compression with target size constraints (999 KB)
4. If the first compression attempt doesn't meet the target size, it applies more aggressive compression settings
5. Generates a preview of both the original and compressed images
6. Allows downloading the compressed result

## Technologies Used

- React
- TypeScript
- browser-image-compression library

## License

MIT