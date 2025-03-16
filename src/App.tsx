import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import './App.css';

function App() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    // Check if file is an image
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      setErrorMessage('Please select a JPEG or PNG image.');
      return;
    }

    setErrorMessage(null);
    setOriginalImage(file);
    setOriginalSize(file.size);
    
    // Display original image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = async () => {
    if (!originalImage) return;

    try {
      setIsCompressing(true);
      setErrorMessage(null);

      // Target max size is 999 KB (999 * 1024 bytes)
      const maxSizeKB = 999;
      const targetSizeBytes = maxSizeKB * 1024;
      
      // Calculate initial quality based on original size
      let initialQuality = 0.8;
      if (originalSize > 10 * 1024 * 1024) { // If > 10MB
        initialQuality = 0.5;
      } else if (originalSize > 5 * 1024 * 1024) { // If > 5MB
        initialQuality = 0.6;
      } else if (originalSize > 2 * 1024 * 1024) { // If > 2MB
        initialQuality = 0.7;
      }

      const options = {
        maxSizeMB: targetSizeBytes / (1024 * 1024), // Convert to MB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: initialQuality,
      };

      const compressedFile = await imageCompression(originalImage, options);
      
      // Check if the compressed file is still too large
      if (compressedFile.size > targetSizeBytes) {
        // Try with more aggressive compression
        const moreCompressedOptions = {
          ...options,
          maxSizeMB: targetSizeBytes / (1024 * 1024),
          initialQuality: 0.5,
          maxWidthOrHeight: 1280,
        };
        const moreCompressedFile = await imageCompression(originalImage, moreCompressedOptions);
        setCompressedImage(moreCompressedFile);
        setCompressedSize(moreCompressedFile.size);
        
        // Display compressed image preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setCompressedPreview(e.target?.result as string);
        };
        reader.readAsDataURL(moreCompressedFile);
      } else {
        setCompressedImage(compressedFile);
        setCompressedSize(compressedFile.size);
        
        // Display compressed image preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setCompressedPreview(e.target?.result as string);
        };
        reader.readAsDataURL(compressedFile);
      }
    } catch (error) {
      console.error('Error compressing image:', error);
      setErrorMessage('Error compressing image. Please try again.');
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadCompressedImage = () => {
    if (!compressedImage) return;
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(compressedImage);
    
    // Generate a filename with "compressed" appended
    const originalName = originalImage?.name || 'image';
    const lastDotIndex = originalName.lastIndexOf('.');
    const baseName = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
    const extension = lastDotIndex !== -1 ? originalName.substring(lastDotIndex) : '';
    const newFileName = `${baseName}-compressed${extension}`;
    
    link.download = newFileName;
    link.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Compressor Tool</h1>
        <p className="App-intro">Compress your images to under 1MB (999KB)</p>
        
        <div className="upload-section">
          <label className="upload-button">
            Select Image
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          {originalImage && (
            <div className="file-info">
              <p>Original: {originalImage.name} ({formatFileSize(originalSize)})</p>
            </div>
          )}
          
          {originalImage && !isCompressing && (
            <button onClick={compressImage} className="compress-button">
              Compress Image
            </button>
          )}
          
          {isCompressing && <p>Compressing...</p>}
          
          {compressedImage && (
            <div className="file-info">
              <p>Compressed size: {formatFileSize(compressedSize)}</p>
              <p>Compression ratio: {Math.round((1 - compressedSize / originalSize) * 100)}%</p>
              <button onClick={downloadCompressedImage} className="download-button">
                Download Compressed Image
              </button>
            </div>
          )}
        </div>
        
        <div className="preview-container">
          {originalPreview && (
            <div className="preview-box">
              <h3>Original</h3>
              <img 
                src={originalPreview} 
                alt="Original" 
                className="preview-image"
              />
            </div>
          )}
          
          {compressedPreview && (
            <div className="preview-box">
              <h3>Compressed</h3>
              <img 
                src={compressedPreview} 
                alt="Compressed" 
                className="preview-image"
              />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;