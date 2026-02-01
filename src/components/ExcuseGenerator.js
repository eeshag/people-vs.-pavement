import React, { useState } from 'react';
import './ExcuseGenerator.css';

const EXCUSES = [
  'People just prefer driving',
  'It\'s more convenient this way',
  'Everyone has a car anyway',
  'It\'s the American way',
  'People want space and privacy',
  'Public transit is too expensive',
  'Nobody would use it',
  'It\'s what the market demands',
  'People like their freedom',
  'It\'s too late to change now',
  'This is how it\'s always been',
  'Density is bad for communities',
  'Walking is for cities, not suburbs',
  'People choose to live here',
  'It works for most people',
  'Change would be too disruptive',
  'People don\'t want to walk',
  'It\'s a lifestyle choice',
  'The infrastructure is already built',
  'People value their independence'
];

function ExcuseGenerator() {
  const [currentExcuse, setCurrentExcuse] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const generateExcuse = () => {
    const randomExcuse = EXCUSES[Math.floor(Math.random() * EXCUSES.length)];
    setCurrentExcuse(randomExcuse);
    setHasGenerated(true);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="excuse-section">
      <div className="excuse-container">
        <h2 className="excuse-title">PEOPLE VS. EXCUSES</h2>
        <p className="excuse-instruction">Click to generate a common justification people use to defend car-dependent suburbia. Click again for a new one.</p>
        
        <div className="excuse-display">
          {!hasGenerated ? (
            <p className="excuse-placeholder">Click the button to generate an excuse</p>
          ) : (
            <p key={animationKey} className="excuse-text">{currentExcuse}</p>
          )}
        </div>

        <button className="excuse-button" onClick={generateExcuse}>
          Generate Excuse
        </button>
      </div>
    </div>
  );
}

export default ExcuseGenerator;
