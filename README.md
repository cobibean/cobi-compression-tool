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