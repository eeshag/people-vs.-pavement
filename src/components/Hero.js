import React from 'react';
import './Hero.css';

function Hero() {
  const handleStartClick = () => {
    const element = document.getElementById('bingo');
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
    <section id="start" className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">PEOPLE VS PAVEMENT</h1>
        <p className="hero-subtext">
          An interactive set of mini experiences showing how car-dependent design affects everyday choices, access, and independence.
        </p>
        <button className="hero-cta" onClick={handleStartClick}>
          Start!
        </button>
      </div>
      <div className="hero-divider"></div>
    </section>
  );
}

export default Hero;
