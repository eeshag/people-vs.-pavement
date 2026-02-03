import React, { useState, useEffect } from 'react';
import './BingoGame.css';

const BINGO_ITEMS = [
  'No sidewalks',
  'Sidewalk randomly ends',
  'Crossing the road feels illegal',
  'Everything is at least a 10-minute drive',
  'Parking lot bigger than the building',
  'Drive-through everywhere',
  'Bus stop with no shelter',
  'Bus comes once an hour (if at all)',
  'School pickup traffic chaos',
  'Parents must drive you to hang out',
  'Bike lane = painted line',
  'Roads designed like highways',
  'Speed limit feels like a suggestion',
  'No safe way to cross a main road',
  'Side streets still feel unsafe',
  'Strip malls only',
  'Nothing open within walking distance',
  '"Just drive" is the solution',
  'You can see places but can\'t walk there',
  'Everyone owns a car',
  'No shade, no trees',
  'Wide roads, narrow sidewalks',
  'No gym in walking distance',
  'Car required to exist'
];

function BingoGame() {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [showWinModal, setShowWinModal] = useState(false);
  const [winType, setWinType] = useState(null);
  const [shownWins, setShownWins] = useState(new Set());

  // Initialize board on mount
  useEffect(() => {
    // Fisher-Yates shuffle algorithm to properly shuffle all 24 items
    const shuffled = [...BINGO_ITEMS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    const flatBoard = new Array(25);
    
    // Place free space at center (index 12)
    flatBoard[12] = { type: 'free', text: 'FREE SPACE' };
    
    // Fill remaining 24 positions with shuffled items (exactly one of each)
    let itemIndex = 0;
    for (let i = 0; i < 25; i++) {
      if (i !== 12) {
        flatBoard[i] = { type: 'item', text: shuffled[itemIndex++] };
      }
    }
    
    // Convert flat array to 5x5 grid
    const newBoard = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        row.push(flatBoard[i * 5 + j]);
      }
      newBoard.push(row);
    }
    
    setBoard(newBoard);
    // Free space is always selected
    setSelected(new Set([12])); // Position 2,2 = index 12 (2*5 + 2)
  }, []);

  // Check for win condition
  useEffect(() => {
    if (board.length === 0) return;
    if (showWinModal) return;
    
    const checkWin = () => {
      // Check rows
      for (let i = 0; i < 5; i++) {
        let count = 0;
        for (let j = 0; j < 5; j++) {
          const index = i * 5 + j;
          if (selected.has(index)) count++;
        }
        if (count === 5) return true;
      }
      
      // Check columns
      for (let j = 0; j < 5; j++) {
        let count = 0;
        for (let i = 0; i < 5; i++) {
          const index = i * 5 + j;
          if (selected.has(index)) count++;
        }
        if (count === 5) return true;
      }
      
      // Check diagonal (top-left to bottom-right)
      let count = 0;
      for (let i = 0; i < 5; i++) {
        const index = i * 5 + i;
        if (selected.has(index)) count++;
      }
      if (count === 5) return true;
      
      // Check diagonal (top-right to bottom-left)
      count = 0;
      for (let i = 0; i < 5; i++) {
        const index = i * 5 + (4 - i);
        if (selected.has(index)) count++;
      }
      if (count === 5) return true;
      
      return false;
    };

    const checkFourCorners = () => {
      const corners = [0, 4, 20, 24];
      return corners.every((index) => selected.has(index));
    };
    
    const checkFullHouse = () => selected.size === 25;
    
    const hasFullHouse = checkFullHouse();
    const hasBingo = checkWin();
    const hasCorners = checkFourCorners();

    let nextWinType = null;
    if (hasFullHouse && !shownWins.has('full-house')) {
      nextWinType = 'full-house';
    } else if (hasBingo && !shownWins.has('bingo')) {
      nextWinType = 'bingo';
    } else if (hasCorners && !shownWins.has('corners')) {
      nextWinType = 'corners';
    }

    if (!nextWinType) return;

    setShownWins(prev => {
      const updated = new Set(prev);
      updated.add(nextWinType);
      if (nextWinType === 'full-house') {
        if (hasBingo) updated.add('bingo');
        if (hasCorners) updated.add('corners');
      } else if (nextWinType === 'bingo' && hasCorners) {
        updated.add('corners');
      }
      return updated;
    });

    setWinType(nextWinType);
    setShowWinModal(true);
  }, [selected, board, showWinModal, shownWins]);

  const handleSquareClick = (row, col) => {
    // Free space is always selected, don't allow toggle
    if (row === 2 && col === 2) return;
    
    const index = row * 5 + col;
    setSelected(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  const closeWinModal = () => {
    setShowWinModal(false);
    setWinType(null);
  };

  const handleNextActivity = () => {
    setShowWinModal(false);
    setWinType(null);
    const element = document.getElementById('chat');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bingo-section">
      <div className="bingo-container">
        <h2 className="bingo-title">PEOPLE VS. SUBURBIA</h2>
        <p className="bingo-instruction">Tap each square that matches your experience. The center is a free space, and five in a row is a bingo.</p>
        
        <div className="bingo-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="bingo-row">
              {row.map((square, colIndex) => {
                const index = rowIndex * 5 + colIndex;
                const isSelected = selected.has(index);
                const isFreeSpace = square.type === 'free';
                
                return (
                  <div
                    key={colIndex}
                    className={`bingo-square ${isSelected ? 'selected' : ''} ${isFreeSpace ? 'free-space' : ''}`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                  >
                    {isFreeSpace && <span className="free-space-icon">🚗</span>}
                    <span className="bingo-square-text">{square.text}</span>
                    {isSelected && !isFreeSpace && (
                      <span className="check-icon">🚗</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {showWinModal && (
        <>
          <div
            className="modal-overlay"
            onClick={winType === 'full-house' ? undefined : closeWinModal}
          ></div>
          <div className="win-modal">
            <div className="win-modal-content">
              <h2 className="win-modal-title">Congrats!</h2>
              <p className="win-modal-text">
                {winType === 'full-house'
                  ? 'Full house! You filled the whole board.'
                  : winType === 'corners'
                    ? 'Good job, you got all four corners!'
                    : 'Congrats you got a bingo and your suburb was designed for cars'}
              </p>
              <div className="car-confetti">
                {[...Array(20)].map((_, i) => (
                  <span key={i} className="car-emoji" style={{
                    animationDelay: `${i * 0.1}s`,
                    left: `${Math.random() * 100}%`,
                  }}>🚗</span>
                ))}
              </div>
              <div className="win-modal-actions">
                {winType !== 'full-house' && (
                  <button className="win-modal-button secondary" onClick={closeWinModal}>
                    Keep playing
                  </button>
                )}
                <button className="win-modal-button" onClick={handleNextActivity}>
                  Next activity
                </button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default BingoGame;
