import React, { useEffect, useState } from 'react';

function TextOverlay({ imageWidth, imageHeight, onUpdateText }) {
  const [imageSrc, setImageSrc] = useState('');
  const [textOverlays, setTextOverlays] = useState([]);
  const [newText, setNewText] = useState('');
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    // Fetch an image from Unsplash API or any other source
    // and set it as the image source.
    // Example:
    // setImageSrc('https://your-image-url.jpg');
  }, []);

  const handleAddText = () => {
    if (newText) {
      setTextOverlays([
        ...textOverlays,
        {
          id: Date.now(),
          text: newText,
          left: 100,
          top: 100,
        },
      ]);
      setNewText('');
    }
  };

  const handleTextChange = (e, id) => {
    const updatedTextOverlays = textOverlays.map((overlay) =>
      overlay.id === id ? { ...overlay, text: e.target.innerText } : overlay
    );
    setTextOverlays(updatedTextOverlays);
  };

  const handleMouseDown = (e, id) => {
    setDragging(id);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMouseMove = (e) => {
    if (dragging !== null) {
      const updatedTextOverlays = textOverlays.map((overlay) =>
        overlay.id === dragging
          ? {
              ...overlay,
              left: e.clientX - e.target.getBoundingClientRect().left,
              top: e.clientY - e.target.getBoundingClientRect().top,
            }
          : overlay
      );
      setTextOverlays(updatedTextOverlays);
    }
  };

  return (
    <div className="App">
      <div className="image-container">
        <img src={imageSrc} alt="Image" />
        {textOverlays.map((overlay) => (
          <div
            key={overlay.id}
            className="text-overlay"
            style={{ left: overlay.left, top: overlay.top }}
            contentEditable
            onMouseDown={(e) => handleMouseDown(e, overlay.id)}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {overlay.text}
          </div>
        ))}
      </div>
      <div className="text-controls">
        <input
          type="text"
          placeholder="Enter Text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <button onClick={handleAddText}>Add Text</button>
      </div>
    </div>
  );
}

export default TextOverlay;
