// src/components/ImageDisplay.js
import React from 'react';

function ImageDisplay({ imageSrc }) {
  return (
    <div className="image-container">
      <img src={imageSrc} alt="Unsplash" />
      {/* Render text overlays here */}
    </div>
  );
}

export default ImageDisplay;
