import React, { useState, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';  
import GenderToggleButton from './Toggle';
import speakerIcon from './volume_up_24dp_1976D2_FILL0_wght400_GRAD0_opsz24.png';

const App = () => {
  const [word, setWord] = useState('');
  const [accent, setAccent] = useState('en-US');
  const [isMale, setIsMale] = useState(true);
  const [phonetic, setPhonetic] = useState('');
  const [meaning, setMeaning] = useState('');
  const [hasPronounced, setHasPronounced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const audioRef = useRef(new Audio());

  const handleGenderChange = (isMale) => {
    setIsMale(isMale);
    console.log('Selected Gender:', isMale ? 'Male' : 'Female');
  };


  const getPronunciation = async () => {
    try {
      setIsLoading(true); // Show loading spinner
      
      const response = await fetch('http://localhost:5000/get-pronunciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: word.trim(), accent, isMale }),
      });
  
      const data = await response.json();
      setPhonetic(data.phonetic);
      setMeaning(data.meaning);
  
      // Handle audio playback
      if (data.audioContent) {
        const byteCharacters = atob(data.audioContent);
        const byteNumbers = Array.from(byteCharacters, (char) =>
          char.charCodeAt(0)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const audioBlob = new Blob([byteArray], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
  
        audioRef.current.src = audioUrl;
        audioRef.current.play();
  
        audioRef.current.onloadeddata = () => URL.revokeObjectURL(audioUrl);
      }
  
      // Set the flag to indicate pronunciation has been played
      setHasPronounced(true);  // Corrected function name
    } catch (error) {
      console.error('Error fetching pronunciation:', error);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };
  
  

  return (
    <div>
      <Navbar />
      <div className='main'>
        <div className='input-container'>
          <div className='input-box'>
            <label>Enter Word: </label>
            <input 
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word"
            />
          </div>

          <div className='input-box'>
            <label>Select Accent: </label>
            <select onChange={(e) => setAccent(e.target.value)} value={accent}>
              <option value="en-US">American English</option>
              <option value="en-GB">British English</option>
              <option value="en-AU">Australian English</option>
              <option value="en-IN">Indian English</option>
            </select>
          </div>
        </div>

        <div className='buttons'>
          <GenderToggleButton onChange={handleGenderChange} />
          <button className='pronounce-button' onClick={getPronunciation} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Pronounce'}
          </button>
        </div>
        
        {/* Hero Section (Only disappears when "Pronounce" is clicked) */}
        {!hasPronounced && (
          <div className="hero-content">
            <h1 className="hero-title">Master Your Pronunciation in Seconds</h1>
            <p className="hero-subtitle">
              Hear words pronounced in multiple accents and voices, all at the click of a button.
            </p>
          </div>
        )}

        {/* Display Loading Indicator */}
        {isLoading && (
          <div className="loading-container">
            <p>Fetching pronunciation...</p>
          </div>
        )}

        {/* Display Phonetic Transcription & Meaning (only when loaded) */}
        {!isLoading && hasPronounced && (
          <div className='pronounce-box'>
            {phonetic && (
              <div>
                <h3>Phonetic Transcription:</h3>
                <img onClick={getPronunciation} src={speakerIcon} alt="Pronounce" className='phonetic-image' />
                <p className='phonetic'>{phonetic}</p>
              </div>
            )}

            {meaning && (
              <div>
                <h3>Meaning:</h3>
                <p>{meaning}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;
