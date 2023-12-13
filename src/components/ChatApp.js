// src/ChatApp.js
import React, { useEffect, useState } from 'react';
import ChatWindow from './ChatWindow';
import '../style/ChatApp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();


  const handleUserMessage = (userInput) => {
    // Add user message to the chat
    setMessages([...messages, { type: 'user', content: userInput }]);

    // Simulate Chatbot response (replace this with OpenAI API integration)
    const botResponse = `Mock response for "${userInput}"`;
    setMessages([...messages, { type: 'bot', content: botResponse }]);
  };
  const handleLogout = () => {
    localStorage.removeItem('authenticationToken');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const fetchChatHistory = async() => {
      try {
        const response = await axios.post(process.env.REACT_APP_API_URL+"/gatAllChatHistory", {
          email: JSON.parse(localStorage.getItem('authenticationToken')).email,
        })

        var allMessages = []
        response.data.map(element => {
            allMessages.push(JSON.parse(element.query));
            allMessages.push(JSON.parse(element.gptResponse));
        });
        setMessages(allMessages)
    
        console.log(response.data);
      } catch (error) {
        console.log("Error Occured : ", error)
      }
    }

    fetchChatHistory()
    
  }, [])

  return (
    <>
    <div className='chatConatiner'>
      <div className='logOut'>
        <button className='logOutBtn' onClick={handleLogout}>Logout</button>
      </div>
        <div className="ChatApp">
        <div className='welcomeLine'>Welcome To BotTalker</div>
      <div className='chatTagLine'>Where Chat Meets Intelligence</div>
        <ChatWindow messages={messages} setMessages={setMessages} onUserMessage={handleUserMessage} />
      </div>
    </div>
    </>
  );
};

export default ChatApp;

