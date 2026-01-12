import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const QUESTIONS = [
  'Is there a bus I can take?',
  'Is the bus stop covered?',
  'Can kids get around on their own?',
  'Is there a speed limit here?',
  'Is this normal?',
  'Why is the nearest gym so far?',
  'What if I want to walk to clear my head?',
  'Can I safely cross the street mid-run?'
];

const RESPONSES = {
  'Is there a bus I can take?': [
    'Yes. It comes eventually.',
    'Eventually.',
    'Technically.',
    'On paper.',
    'Yes, in theory.',
    'It should arrive.',
    'There is one scheduled.',
    'You may be able to.'
  ],
  'Is the bus stop covered?': [
    'No 🙂',
    'Weather builds character.',
    'The sky is your shelter.',
    'You are exposed.',
    'Unfortunately, no.',
    'Not at this time.',
    'Coverage is limited.',
    'It is not provided.'
  ],
  'Can kids get around on their own?': [
    'No. Freedom sold separately.',
    'Only with a driver\'s license.',
    'Independence was optimized out.',
    'Not safely.',
    'Not independently.',
    'Not without assistance.',
    'Supervision is recommended.',
    'That is not supported.'
  ],
  'Is there a speed limit here?': [
    'There is a speed limit 🙂',
    'It exists in theory.',
    'It\'s decorative.',
    'Cars interpret it freely.',
    'Yes, technically.',
    'It is posted.',
    'Enforcement varies.',
    'Compliance is optional.'
  ],
  'Is this normal?': [
    'You\'ve gotten used to it.',
    'It feels normal now.',
    'This is the default.',
    'Everyone stopped questioning it.',
    'This is typical.',
    'This is expected.',
    'This is standard.',
    'This is how it usually works.'
  ],
  'Why is the nearest gym so far?': [
    'Fitness requires sitting in a 🚗.',
    'Walking there would defeat the point.',
    'Health is a destination.',
    'It\'s nearby by car.',
    'It is not designed to be walkable.',
    'Access assumes a vehicle.',
    'Proximity is relative.',
    'It is nearby for drivers.'
  ],
  'What if I want to walk to clear my head?': [
    'Drive somewhere calm.',
    'Walking is off-site.',
    'Peace is zoned elsewhere.',
    'Try the parking lot.',
    'Walking is not prioritized.',
    'That is not encouraged here.',
    'There are limited options.',
    'You may prefer to drive.'
  ],
  'Can I safely cross the street mid-run?': [
    'The 🚗s will decide.',
    'Depends on traffic.',
    'The road has opinions.',
    'Only briefly.',
    'Caution is advised.',
    'Results may vary.',
    'Safety cannot be guaranteed.',
    'Use at your discretion.'
  ]
};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleQuestionClick = (question) => {
    // Add user question to messages
    const userMessage = { type: 'user', text: question };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const responses = RESPONSES[question];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const botMessage = { type: 'bot', text: randomResponse };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="chatbot-section">
      <div className="chatbot-container">
        <h2 className="chatbot-title">Infrastructure Assistant</h2>
        <p className="chatbot-instruction">Select a question.</p>
        
        <div className="chatbot-messages" ref={messagesContainerRef}>
          {messages.length === 0 && (
            <div className="chatbot-empty-state">
              <p>Start a conversation by selecting a question below.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="chatbot-message-bubble">
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chatbot-message bot-message">
              <div className="chatbot-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <div className="chatbot-questions">
          {QUESTIONS.map((question, index) => (
            <button
              key={index}
              className="chatbot-question-button"
              onClick={() => handleQuestionClick(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
