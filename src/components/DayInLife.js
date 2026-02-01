import React, { useState } from 'react';
import './DayInLife.css';

const CHARACTERS = [
  { id: 'teenager', name: 'Teenager' },
  { id: 'elderly', name: 'Elderly Person' }
];

const SCENARIOS = {
  teenager: [
    {
      time: 'Morning',
      title: 'Getting to School',
      options: [
        { text: 'Walk', result: 'Ha! You wish you could walk to school', success: false, goBack: true },
        { text: 'Bike', result: 'Fast traffic, not safe to bike', success: false, goBack: true },
        { text: 'Bus', result: 'Bus was late, you were late to school', success: false },
        { text: 'Ride', result: 'Parents were free to give you a ride', success: true }
      ],
      outcome: null
    },
    {
      time: 'Afternoon',
      title: 'After-School Activity',
      options: [
        { text: 'Bus', result: 'You went to the activity, but the late bus never came, you were stuck at school for an hour until someone could come pick you up', success: false },
        { text: 'Ride', result: 'Your parents said they were busy so you decided to go home early and miss the activity', success: false },
        { text: 'Walk', result: 'You live too far away to walk to school remember', success: false },
        { text: 'Bike', result: 'Dark outside, not safe to bike', success: false }
      ],
      outcome: null
    },
    {
      time: 'Evening',
      title: 'Hanging out with Friends',
      options: [
        { text: 'Ride', result: 'Your parents are busy, you have to stay home', success: false },
        { text: 'Walk', result: 'Highway adjacent road, you have to stay home', success: false },
        { text: 'Bike', result: 'No bike infrastructure, dark after, you have to stay home', success: false },
        { text: 'Bus', result: 'No bus routes to anywhere near your friends house', success: false }
      ],
      outcome: null,
      conditional: true
    },
    {
      time: 'Afternoon',
      title: 'Running Errands',
      options: [
        { text: 'Walk', result: 'No way to get there', success: false },
        { text: 'Ride', result: 'No car, parents don\'t want to drive you', success: false },
        { text: 'Bus', result: 'Bus stopped', success: false },
        { text: 'Bike', result: 'No way to bike there either', success: false }
      ],
      outcome: null
    }
  ],
  elderly: [
    {
      time: 'Morning',
      title: 'Medical Appointment',
      options: [
        { text: 'Walk', result: '❌ No safe crossings', success: false },
        { text: 'Bus', result: '❌ Long walk to stop', success: false },
        { text: 'Ride', result: '❌ Depends on family availability', success: false }
      ],
      outcome: 'Appointment rescheduled.'
    },
    {
      time: 'Afternoon',
      title: 'Social Activity',
      options: [
        { text: 'Walk', result: '❌ Too far', success: false },
        { text: 'Bus', result: '❌ Missed connection', success: false }
      ],
      outcome: 'You stay home.'
    },
    {
      time: 'Midday',
      title: 'Grocery Run',
      options: [
        { text: 'Walk', result: '❌ Heavy bags and long distance', success: false },
        { text: 'Bus', result: '❌ No direct route to the store', success: false },
        { text: 'Ride', result: '❌ Family can’t come until later', success: false }
      ],
      outcome: 'Groceries are postponed.'
    },
    {
      time: 'Evening',
      title: 'Pick Up Prescriptions',
      options: [
        { text: 'Walk', result: '❌ Poor lighting and uneven sidewalks', success: false },
        { text: 'Bus', result: '❌ Service ends early in the evening', success: false },
        { text: 'Ride', result: '❌ No one is available to drive', success: false }
      ],
      outcome: 'Medication pickup is delayed.'
    }
  ]
};

function DayInLife() {
  const [screen, setScreen] = useState('intro'); // intro, character-select, simulation, results, explanation
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [stats, setStats] = useState({ tripsCompleted: 0, timesReliedOnOthers: 0, activitiesSkipped: 0 });
  const [showOutcome, setShowOutcome] = useState(false);
  const [previousChoices, setPreviousChoices] = useState([]);

  const handleStartDay = () => {
    setScreen('character-select');
  };

  const handleCharacterSelect = (characterId) => {
    setSelectedCharacter(characterId);
    setScreen('simulation');
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setShowOutcome(false);
    setStats({ tripsCompleted: 0, timesReliedOnOthers: 0, activitiesSkipped: 0 });
    setPreviousChoices([]);
  };

  const handleOptionSelect = (option) => {
    // If option requires going back, just reset to show options again
    if (option.goBack) {
      setSelectedOption(option);
      setShowOutcome(true);
      return;
    }

    setSelectedOption(option);
    setShowOutcome(true);
    
    // Track the choice for conditional scenarios
    const newChoices = [...previousChoices, { scenarioIndex: currentScenarioIndex, optionText: option.text }];
    setPreviousChoices(newChoices);
    
    const newStats = { ...stats };
    if (option.success) {
      newStats.tripsCompleted++;
      newStats.timesReliedOnOthers++;
    } else {
      newStats.activitiesSkipped++;
    }
    setStats(newStats);
  };

  const handleContinue = () => {
    if (selectedOption && selectedOption.goBack) {
      setSelectedOption(null);
      setShowOutcome(false);
      return;
    }

    const scenarios = SCENARIOS[selectedCharacter];
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedOption(null);
      setShowOutcome(false);
    } else {
      setScreen('results');
    }
  };

  const handleTryDifferentDay = () => {
    setScreen('character-select');
    setSelectedCharacter(null);
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setShowOutcome(false);
    setStats({ tripsCompleted: 0, timesReliedOnOthers: 0, activitiesSkipped: 0 });
    setPreviousChoices([]);
  };

  const handleWhyThisHappens = () => {
    setScreen('explanation');
  };

  const handleBackFromExplanation = () => {
    setScreen('results');
  };

  const getCurrentScenario = () => {
    if (!selectedCharacter) return null;

    const scenario = SCENARIOS[selectedCharacter][currentScenarioIndex];

    if (scenario && scenario.conditional && selectedCharacter === 'teenager' && currentScenarioIndex === 2) {
      const afterSchoolChoice = previousChoices.find((choice) => choice.scenarioIndex === 1);
      if (afterSchoolChoice && afterSchoolChoice.optionText === 'Bus') {
        return {
          ...scenario,
          options: [],
          autoOutcome: true,
          outcome: 'Sorry, since you were stuck after school for an hour because the bus never came, you didn\'t have time to go to your friend\'s house.'
        };
      }
    }

    if (scenario && selectedCharacter === 'teenager' && currentScenarioIndex === 1) {
      return {
        ...scenario,
        optionsInstruction: 'Choose how you will get home after the after-school activity you want to go to.'
      };
    }

    return scenario;
  };

  const currentScenario = getCurrentScenario();

  return (
    <div className="day-in-life-section">
      <div className="day-in-life-container">
        {screen === 'intro' && (
          <div className="day-intro">
            <h2 className="day-title">PEOPLE VS. INDEPENDENCE</h2>
            <div className="day-subtitle">
              <p>You live in a typical car-dependent suburb.</p>
              <p>You do not have a car today.</p>
              <p>Pick a character and make travel choices to see what happens.</p>
            </div>
            <button className="day-primary-button" onClick={handleStartDay}>
              👉 Start My Day
            </button>
          </div>
        )}

        {screen === 'character-select' && (
          <div className="character-select">
            <h2 className="day-title">Choose Your Day</h2>
            <p className="day-instruction">Choose a character to simulate a day without a car:</p>
            <div className="character-grid">
              {CHARACTERS.map((character) => (
                <button
                  key={character.id}
                  className="character-button"
                  onClick={() => handleCharacterSelect(character.id)}
                >
                  {character.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === 'simulation' && currentScenario && (
          <>
            <h2 className="day-title">PEOPLE VS. INDEPENDENCE</h2>
            <div className="simulation-screen">
              <div className="scenario-header">
                <span className="time-block">{currentScenario.time}</span>
                <h3 className="scenario-title">{currentScenario.title}</h3>
              </div>
            
              {!showOutcome && !currentScenario.autoOutcome ? (
                <div className="options-container">
                <p className="options-instruction">
                  {currentScenario.optionsInstruction || "Choose how you'll get there:"}
                </p>
                  <div className="options-grid">
                    {currentScenario.options.map((option, index) => (
                      <button
                        key={index}
                        className="option-button"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="outcome-container">
                  <div className="outcome-result">
                    {selectedOption && (
                      <div className="option-result">
                        <p className="result-text">{selectedOption.result}</p>
                      </div>
                    )}
                    {currentScenario.outcome && (
                      <div className="outcome-message">
                        <p className="outcome-text">{currentScenario.outcome}</p>
                      </div>
                    )}
                    {selectedOption && selectedOption.goBack && (
                      <div className="outcome-message">
                        <p className="outcome-text">(Go back to previous screen, choose again)</p>
                      </div>
                    )}
                  </div>
                  <button className="continue-button" onClick={handleContinue}>
                    {selectedOption && selectedOption.goBack ? '← Choose Again' : '👉 Continue →'}
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {screen === 'results' && (
          <div className="results-screen">
            <h2 className="day-title">Your Results</h2>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-value">{stats.tripsCompleted}</span>
                <span className="stat-label">Trips completed independently</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.timesReliedOnOthers}</span>
                <span className="stat-label">Times you relied on someone else</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.activitiesSkipped}</span>
                <span className="stat-label">Activities skipped</span>
              </div>
            </div>
            <p className="results-key-line">Your freedom depended on someone else's car.</p>
            <div className="results-buttons">
              <button className="results-button" onClick={handleTryDifferentDay}>
                🔁 Try a Different Day
              </button>
              <button className="results-button" onClick={handleWhyThisHappens}>
                🧠 Why This Happens
              </button>
            </div>
          </div>
        )}

        {screen === 'explanation' && (
          <div className="explanation-screen">
            <h2 className="day-title">Why This Happens</h2>
            <div className="explanation-content">
              <div className="explanation-intro">
                <p>These outcomes are systemic, not individual.</p>
                <p>They come from transportation and land-use decisions that prioritize cars over people.</p>
              </div>

              <h3 className="explanation-heading">Built Environment</h3>
              <ul className="explanation-list">
                <li>Low-density zoning separates housing from jobs, groceries, healthcare, and social spaces.</li>
                <li>Wide, high-speed roads increase crossing distances and reduce pedestrian safety.</li>
                <li>Large intersections create long signal cycles and delay safe crossings.</li>
              </ul>

              <h3 className="explanation-heading">Access Gaps</h3>
              <ul className="explanation-list">
                <li>Sidewalk gaps, missing curb ramps, and poor lighting make short trips unsafe or impossible.</li>
                <li>Transit routes are limited when destinations are spread out.</li>
                <li>Service frequency drops off-peak, making trips unreliable without a car.</li>
              </ul>

              <h3 className="explanation-heading">Everyday Impact</h3>
              <ul className="explanation-list">
                <li>Travel without a car depends on long detours, unsafe conditions, or finding a driver.</li>
                <li>Delays and cancellations compound, pushing essential tasks to another day.</li>
                <li>This isn’t a personal failure; it’s a predictable policy outcome.</li>
              </ul>
            </div>
            <button className="results-button" onClick={handleBackFromExplanation}>
              ← Back to Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DayInLife;
