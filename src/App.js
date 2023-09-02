import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // Import Draggable
import './App.css';

function App() {
  const [imageSrc, setImageSrc] = useState('');
  const [textOverlays, setTextOverlays] = useState([]);
  const [newText, setNewText] = useState('');
  const [newTextPosition, setNewTextPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const unsplashApiKey = 'bUVNPHUe7v2tmbXmcQBEQeNBzSmUgZjr27Z7bd97mTw';
    fetch(`https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setImageSrc(data.urls.regular);
      })
      .catch((error) => {
        console.error('Error fetching image from Unsplash:', error);
      });
  }, []);

  const handleAddText = () => {
    if (newText) {
      setTextOverlays([
        ...textOverlays,
        {
          id: Date.now(),
          text: newText,
          left: newTextPosition.x,
          top: newTextPosition.y,
        },
      ]);
      setNewText('');
    }
  };

  const handleTextChange = (e, id) => {
    const updatedTextOverlays = textOverlays.map((overlay) =>
      overlay.id === id ? { ...overlay, text: e.target.value } : overlay
    );
    setTextOverlays(updatedTextOverlays);
  };

  const handleDeleteText = (id) => {
    const updatedTextOverlays = textOverlays.filter(
      (overlay) => overlay.id !== id
    );
    setTextOverlays(updatedTextOverlays);
  };

  return (
    <div className="App">
      <Draggable defaultPosition={newTextPosition} bounds="parent">
        {/* Wrap the text input container with Draggable */}
        <div className="text-input-container">
          <textarea
            placeholder="Enter Text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="text-input"
          />
          <button onClick={handleAddText} className="add-text-button">
            Add Text
          </button>
        </div>
      </Draggable>
      <div className="image-container">
        <img src={imageSrc} alt="Image" />
        {textOverlays.map((overlay) => (
          <Draggable
            key={overlay.id}
            defaultPosition={{ x: overlay.left, y: overlay.top }}
            bounds="parent"
          >
            <div className="text-overlay">
              <span className="overlay-text">{overlay.text}</span>
              <button
                onClick={() => handleDeleteText(overlay.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default App;
