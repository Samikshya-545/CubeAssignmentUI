// src/ChatApp.js
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import '../style/ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  const handleUserMessage = (userInput) => {
    // Add user message to the chat
    setMessages([...messages, { type: 'user', content: userInput }]);

    // Simulate Chatbot response (replace this with OpenAI API integration)
    const botResponse = `Mock response for "${userInput}"`;
    setMessages([...messages, { type: 'bot', content: botResponse }]);
  };

  return (
    <div className="ChatApp">
      <h1>React Chat App</h1>
      <ChatWindow messages={messages} setMessages={setMessages} onUserMessage={handleUserMessage} />
    </div>
  );
};

export default ChatApp;

