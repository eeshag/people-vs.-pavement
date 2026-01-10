import React, { useState, useEffect, useRef } from 'react';
import './BingoGame.css';

const BingoGame = () => {
  const [hasWon, setHasWon] = useState(false);
  const confettiContainerRef = useRef(null);
  
  // Bingo items related to car-dependent suburbia
  const [bingoItems, setBingoItems] = useState([
    { id: 0, text: 'No sidewalks within walking distance', checked: false },
    { id: 1, text: 'Nearest grocery store is 2+ miles away', checked: false },
    { id: 2, text: 'No bike lanes on main roads', checked: false },
    { id: 3, text: 'Public transit doesn\'t reach your area', checked: false },
    { id: 4, text: 'Crossing the street feels dangerous', checked: false },
    { id: 5, text: 'Kids can\'t walk to school safely', checked: false },
    { id: 6, text: 'Every errand requires a car trip', checked: false },
    { id: 7, text: 'No nearby parks or public spaces', checked: false },
    { id: 8, text: 'High-speed traffic on residential streets', checked: false },
    { id: 9, text: 'No safe place to wait for a bus', checked: false },
    { id: 10, text: 'Walking means walking in the street', checked: false },
    { id: 11, text: 'No bike parking at destinations', checked: false },
    { id: 12, text: 'FREE SPACE', checked: true }, // Center square
    { id: 13, text: 'Nearest coffee shop is a 15+ min drive', checked: false },
    { id: 14, text: 'Teenagers can\'t get anywhere independently', checked: false },
    { id: 15, text: 'Elderly neighbors are housebound', checked: false },
    { id: 16, text: 'No pedestrian crossings at intersections', checked: false },
    { id: 17, text: 'Everything is separated by parking lots', checked: false },
    { id: 18, text: 'No mixed-use development nearby', checked: false },
    { id: 19, text: 'Can\'t walk to a friend\'s house', checked: false },
    { id: 20, text: 'No safe route for kids to bike', checked: false },
    { id: 21, text: 'Public spaces are only accessible by car', checked: false },
    { id: 22, text: 'No shade or shelter while walking', checked: false },
    { id: 23, text: 'Nearest library is a 20+ min drive', checked: false },
    { id: 24, text: 'No way to get around without a license', checked: false },
  ]);

  const toggleItem = (id) => {
    setBingoItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Check for bingo win (5 in a row: rows, columns, diagonals)
  const checkForWin = (items) => {
    const grid = [];
    // Convert flat array to 5x5 grid
    for (let i = 0; i < 5; i++) {
      grid[i] = [];
      for (let j = 0; j < 5; j++) {
        grid[i][j] = items[i * 5 + j].checked;
      }
    }

    // Check rows
    for (let i = 0; i < 5; i++) {
      if (grid[i].every(cell => cell)) return true;
    }

    // Check columns
    for (let j = 0; j < 5; j++) {
      if (grid.every(row => row[j])) return true;
    }

    // Check main diagonal (top-left to bottom-right)
    if (grid.every((row, i) => row[i])) return true;

    // Check anti-diagonal (top-right to bottom-left)
    if (grid.every((row, i) => row[4 - i])) return true;

    return false;
  };

  // Trigger car confetti
  const triggerCarConfetti = () => {
    const cars = ['🚗', '🚙', '🚕', '🚐', '🚚', '🚛', '🚜', '🏎️'];
    const container = confettiContainerRef.current;
    if (!container) return;

    // Clear any existing confetti
    container.innerHTML = '';

    // Create 50 car confetti pieces
    for (let i = 0; i < 50; i++) {
      const car = document.createElement('div');
      car.className = 'confetti-car';
      car.textContent = cars[Math.floor(Math.random() * cars.length)];
      car.style.left = Math.random() * 100 + '%';
      car.style.animationDelay = Math.random() * 2 + 's';
      car.style.animationDuration = (Math.random() * 2 + 3) + 's';
      container.appendChild(car);
    }

    // Remove confetti after animation
    setTimeout(() => {
      container.innerHTML = '';
    }, 5000);
  };

  // Check for win whenever items change
  useEffect(() => {
    if (checkForWin(bingoItems) && !hasWon) {
      setHasWon(true);
      triggerCarConfetti();
    }
  }, [bingoItems, hasWon]);

  const checkedCount = bingoItems.filter(item => item.checked).length;
  const totalItems = bingoItems.length;

  return (
    <section className="bingo-section">
      <div ref={confettiContainerRef} className="confetti-container"></div>
      <div className="bingo-container">
        <h1 className="main-title">PEOPLE VS PAVEMENT</h1>
        <div className="title-divider"></div>
        <h2 className="bingo-title">Car-Dependency Bingo</h2>
        <p className="bingo-subtitle">
          Check off the features of car-dependent suburbia that affect your daily life.
        </p>
        
        <div className="bingo-grid">
          {bingoItems.map((item) => (
            <button
              key={item.id}
              className={`bingo-square ${item.checked ? 'checked' : ''}`}
              onClick={() => toggleItem(item.id)}
              aria-label={item.text}
            >
              <span className="bingo-text">{item.text}</span>
              {item.checked && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>

        {hasWon && (
          <div className="bingo-win-message">
            <h3>BINGO! 🎉</h3>
            <p>You've completed a line! This is what car-dependent suburbia looks like.</p>
          </div>
        )}
        <div className="bingo-stats">
          <p className="stats-text">
            You've checked <strong>{checkedCount}</strong> out of <strong>{totalItems}</strong> items
          </p>
          {checkedCount > 0 && !hasWon && (
            <p className="stats-message">
              {checkedCount <= 5 
                ? "Just getting started? These patterns are everywhere."
                : checkedCount <= 10
                ? "You're noticing the patterns. Keep going."
                : checkedCount <= 15
                ? "You're seeing how deeply this affects daily life."
                : checkedCount <= 20
                ? "This is the reality for many people. You're not alone."
                : "You've experienced most of these. This is what car-dependent design looks like."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BingoGame;
