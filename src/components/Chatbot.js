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

/*
const PREFACE_RESPONSES = [
  'Great question!',
  'Good question!',
  'Love that question!',
  'That is a great question.',
  'Glad you asked!',
  'Thanks for asking!',
  'Interesting question!',
  'Excellent question!',
  'That is a fair question.'
];

const FOLLOWUP_RESPONSES = [
  'Please let me know if you have any other questions!',
  'Ask anytime if you want to know more.',
  'Happy to help with any other questions.',
  'Let me know if you want to dive deeper.',
  'Feel free to ask another question.',
  'I am here if you have more questions.',
  'Reach out if anything else comes up.',
  'Let me know if you want another answer.'
];

const getRandomNonRepeating = (responses, lastRef) => {
  if (!responses.length) return '';
  if (responses.length === 1) {
    lastRef.current = responses[0];
    return responses[0];
  }

  let next = responses[Math.floor(Math.random() * responses.length)];
  while (next === lastRef.current) {
    next = responses[Math.floor(Math.random() * responses.length)];
  }
  lastRef.current = next;
  return next;
};
*/

function Chatbot() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'hi!' },
    { type: 'bot', text: 'Start a conversation by selecting a question below.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef(null);
  const questionCountRef = useRef(0);
  // const lastPrefaceRef = useRef(null);
  // const lastFollowUpRef = useRef(null);

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
    questionCountRef.current += 1;
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      /*
      const shouldPreface = Math.random() < 0.6;
      const prefaceDelay = shouldPreface ? 500 : 0;

      if (shouldPreface) {
        const prefaceText = getRandomNonRepeating(PREFACE_RESPONSES, lastPrefaceRef);
        const prefaceMessage = { type: 'bot', text: prefaceText };
        setMessages(prev => [...prev, prefaceMessage]);
      }
      */

      setTimeout(() => {
        const responses = RESPONSES[question];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const botMessage = { type: 'bot', text: randomResponse };
        setMessages(prev => [...prev, botMessage]);

        /*
        const shouldFollowUp = Math.random() < 0.4;
        const followUpDelay = shouldFollowUp ? 500 : 0;

        setTimeout(() => {
          if (shouldFollowUp) {
            const followUpText = getRandomNonRepeating(FOLLOWUP_RESPONSES, lastFollowUpRef);
            const followUpMessage = { type: 'bot', text: followUpText };
            setMessages(prev => [...prev, followUpMessage]);
          }
          setIsTyping(false);
        }, followUpDelay);
        */

        if (questionCountRef.current === 5) {
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                type: 'bot',
                text: 'These are amazing questions by the way, hope my responses are helping :)'
              }
            ]);
            setIsTyping(false);
          }, 500);
        } else {
          setIsTyping(false);
        }
      }, 0);
    }, 500);
  };

  return (
    <div className="chatbot-section">
      <div className="chatbot-container">
        <h2 className="chatbot-title">PEOPLE VS. COMMON SENSE</h2>
        <p className="chatbot-instruction">Choose a question to ask the suburb. The replies show the kind of answers people often get.</p>
        
        <div className="chatbot-messages" ref={messagesContainerRef}>
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
