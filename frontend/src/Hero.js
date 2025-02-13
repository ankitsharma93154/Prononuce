import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import GenderToggleButton from './Toggle'; // Assuming this component exists
import speakerIcon from './volume_up_24dp_1976D2_FILL0_wght400_GRAD0_opsz24.png'; // Replace with actual image path
import FeatureSection from './FeatureSection'; // Assuming you want to keep this part

const Hero = () => {
  const [word, setWord] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [meaning, setMeaning] = useState('');
  const [accent, setAccent] = useState('en-US');
  const [voice, setVoice] = useState('Male');
  
  // Function to handle gender change (if you want to toggle between male and female voice)
  const handleGenderChange = (e) => {
    setVoice(e.target.value);
  };

  // Function to fetch pronunciation and meaning (mocked)
  const getPronunciation = () => {
    if (word) {
      // Mock API call to get pronunciation and phonetic transcription
      setPhonetic("/ˈwɜːd/"); // Replace with actual phonetic logic
      setMeaning("A unit of language that has meaning and can be spoken or written."); // Replace with actual meaning logic
    }
  };

  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="input-container">
          <div className="input-box">
            <label>Enter Word: </label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word"
            />
          </div>

          <div className="input-box">
            <label>Select Accent: </label>
            <select onChange={(e) => setAccent(e.target.value)} value={accent}>
              <option value="en-US">American English</option>
              <option value="en-GB">British English</option>
              <option value="en-AU">Australian English</option>
              <option value="en-IN">Indian English</option>
            </select>
          </div>
        </div>

        <div className="buttons">
          <GenderToggleButton onChange={handleGenderChange} />
          <button className="pronounce-button" onClick={getPronunciation}>
            Pronounce
          </button>
        </div>

        {/* Display Phonetic Transcription */}
        <div className="pronounce-box">
          {phonetic && (
            <div>
              <h3>Phonetic Transcription:</h3>
              <img
                onClick={getPronunciation}
                src={speakerIcon}
                alt="Pronounce"
                className="phonetic-image"
              />
              <p className="phonetic">{phonetic}</p>
            </div>
          )}

          {/* Display Meaning */}
          {meaning && (
            <div>
              <h3>Meaning:</h3>
              <p>{meaning}</p>
            </div>
          )}
        </div>

        {/* Feature section */}
        <FeatureSection />
      </div>
      <Footer />
    </div>
  );
};

export default Hero;
