import React, { useState, useEffect } from 'react';
import './TopNavigation.css';

const navItems = [
  { id: 'start', label: 'Start' },
  { id: 'bingo', label: 'Bingo' },
  { id: 'chat', label: 'Chat' },
  { id: 'simulator', label: 'Simulator' },
  { id: 'excuses', label: 'Excuses' },
  { id: 'why', label: 'Why' }
];

function TopNavigation() {
  const [activeSection, setActiveSection] = useState('start');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Determine active section based on scroll position
      const sections = navItems.map(item => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: item.id,
            top: rect.top,
            bottom: rect.bottom
          };
        }
        return null;
      }).filter(Boolean);

      // Find the section currently in view
      const viewportMiddle = window.innerHeight / 2;
      const navOffset = 80;
      let currentSection = 'start';

      for (const section of sections) {
        // Account for nav offset
        const adjustedTop = section.top + navOffset;
        if (adjustedTop <= viewportMiddle && section.bottom >= viewportMiddle) {
          currentSection = section.id;
          break;
        }
      }

      // If no section is in the middle, find the closest one above viewport middle
      if (currentSection === 'start') {
        let closestSection = 'start';
        let closestDistance = Infinity;

        for (const section of sections) {
          const adjustedTop = section.top + navOffset;
          const distance = Math.abs(adjustedTop - viewportMiddle);
          if (distance < closestDistance && adjustedTop <= viewportMiddle) {
            closestDistance = distance;
            closestSection = section.id;
          }
        }
        if (closestSection !== 'start') {
          currentSection = closestSection;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="top-navigation">
      <div className="nav-progress" style={{ width: `${scrollProgress}%` }}></div>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => handleNavClick('start')}>
          PEOPLE VS PAVEMENT
        </div>
        <button 
          className="nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={isMobileMenuOpen ? 'hamburger open' : 'hamburger'}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default TopNavigation;
