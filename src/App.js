import './App.css';
import TopNavigation from './components/TopNavigation';
import Hero from './components/Hero';
import BingoGame from './components/BingoGame';
import Chatbot from './components/Chatbot';
import DayInLife from './components/DayInLife';
import ExcuseGenerator from './components/ExcuseGenerator';
import Conclusion from './components/Conclusion';

function App() {
  return (
    <div className="App">
      <TopNavigation />
      <Hero />
      <section id="bingo">
        <BingoGame />
        <div className="section-transition">
          <div className="transition-line"></div>
          <p className="transition-text">Okay… now ask the suburb a question.</p>
        </div>
      </section>
      <section id="chat">
        <Chatbot />
        <div className="section-transition">
          <div className="transition-line"></div>
          <p className="transition-text">Now try living a full day like this.</p>
        </div>
      </section>
      <section id="simulator">
        <DayInLife />
        <div className="section-transition">
          <div className="transition-line"></div>
          <p className="transition-text">Same place. Same rules.</p>
        </div>
      </section>
      <section id="excuses">
        <ExcuseGenerator />
        <div className="section-transition">
          <div className="transition-line"></div>
          <p className="transition-text">So why make this at all?</p>
        </div>
      </section>
      <section id="why">
        <Conclusion />
      </section>
    </div>
  );
}

export default App;
