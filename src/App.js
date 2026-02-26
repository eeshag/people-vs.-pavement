import React, { useEffect } from 'react';
import './App.css';
import { Analytics } from '@vercel/analytics/react';
import TopNavigation from './components/TopNavigation';
import Hero from './components/Hero';
import BingoGame from './components/BingoGame';
import Chatbot from './components/Chatbot';
import DayInLife from './components/DayInLife';
import ExcuseGenerator from './components/ExcuseGenerator';
import Conclusion from './components/Conclusion';

function App() {
  useEffect(() => {
    // Disable browser scroll restoration to prevent unwanted scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Handle hash navigation if present
    const hash = window.location.hash;
    if (hash) {
      // If there's a hash, wait a bit then scroll to it
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // If no hash, ensure we're at the top immediately
      window.scrollTo(0, 0);
      // Also scroll to top after a short delay to override any browser restoration
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  }, []);

  return (
    <div className="App">
      <TopNavigation />
      <Hero />
      <div className="section-divider" aria-hidden="true"></div>
      <section id="bingo">
        <BingoGame />
        <div className="section-transition">
          <div className="transition-line"></div>
          <p className="transition-text">Okay… now ask the suburb a question.</p>
        </div>
      </section>
      <div className="section-divider" aria-hidden="true"></div>
      <section id="chat">
        <Chatbot />
        <div className="section-transition">
          <div className="transition-line"></div>
          <p className="transition-text">Now try living a full day like this.</p>
        </div>
      </section>
      <div className="section-divider" aria-hidden="true"></div>
      <section id="simulator">
        <DayInLife />
        <div className="section-transition">
          <div className="transition-line"></div>
          <p className="transition-text">Same place. Same rules.</p>
        </div>
      </section>
      <div className="section-divider" aria-hidden="true"></div>
      <section id="excuses">
        <ExcuseGenerator />
        <div className="section-transition">
          <div className="transition-line"></div>
          <p className="transition-text">So why make this at all?</p>
        </div>
      </section>
      <div className="section-divider" aria-hidden="true"></div>
      <section id="why">
        <Conclusion />
      </section>
      <Analytics />
    </div>
  );
}

export default App;
