// src/ChatWindow.js
import React, { useState } from 'react';
import '../style/ChatWindow.css';
import userLogo from '../images/userIcon.png';
import { io } from "socket.io-client";

const socket = io("localhost:5001/", {
    transports: ["websocket"],
    cors: {
      origin: "http://localhost:3000/",
    },
    autoConnect: false
  })

const ChatWindow = ({ messages, setMessages, onUserMessage }) => {
  const [userInput, setUserInput] = useState('');
  const [socketRes, setSocketRes] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  socket.on('from-flask', (msg) => {
    setSocketRes(msg);
    console.log(msg);
  });

  const handleSendMessage = async () => {
    if (userInput.trim() !== '') {
    //   onUserMessage(userInput);
      // Simulate Chatbot response (replace this with OpenAI API integration)
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { type: 'user', content: userInput },
    //   ]);
        socket.emit('to-flask', 'hello');

      // Simulate Chatbot response (replace this with OpenAI API integration)
      const botResponse = `Mock response for "${userInput}"`;

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', content: botResponse },
      ]);
      setUserInput('');
    }
  };

  return (
    <div className="ChatWindow">
      <div className='responseBox'>
      {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.type === 'user' ? (
              <div className="user-message">
                <img src={userLogo} alt="User Logo" className="user-logo" />
                {message.content}
              </div>
            ) : (
              message.content
            )}
          </div>
        ))}
      </div>
      <div className='userInputBox'>
        <input type="text" value={userInput} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
        {socketRes}
      </div>
    </div>
  );
};

export default ChatWindow;

