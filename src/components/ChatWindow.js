// src/ChatWindow.js
import React, { useState, useEffect, useRef } from 'react';
import '../style/ChatWindow.css';
import userLogo from '../images/userIcon.png';
import { io } from "socket.io-client";
import axios from 'axios';
import SocketService from '../serices/SocketService';

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
  const [ongoingGptResponse, setOngoingGptResponse] = useState("");
  const [currentMessageTimeStamp, setCurrentMessageTimeStamp] = useState();
  const [ongoingGptResponseStopped, setOngoingGptResponseStopped] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]); 

  useEffect(() => {
    const saveChatHistoryToDb = async () => {
      console.log(messages);
      // Make api call to save this chat in the DB
      await axios.post(process.env.REACT_APP_API_URL+"/saveChatHistory", {
        email: JSON.parse(localStorage.getItem('authenticationToken')).email,
        query: messages[messages.length-2],
        gptResponse: messages[messages.length-1]
      })
    }
    if(ongoingGptResponseStopped === true){
      saveChatHistoryToDb();
      setOngoingGptResponse("")
    }
  }, [ongoingGptResponseStopped])

  useEffect(() => {
    // Connect to the WebSocket when the component mounts
    SocketService.connect('http://127.0.0.1:5000/');  // Adjust the URL

    // Set up a callback function to handle incoming messages
    SocketService.setCallback(handleGptResponse);

    SocketService.setOngoingGptResponseEndedCallBack(handleOngoingGptResponseEndedCallBack);


    return () => {
      // Disconnect from the WebSocket and clean up when the component unmounts
      SocketService.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleOngoingGptResponseEndedCallBack = () => {
    setOngoingGptResponseStopped(true);
  }

  useEffect(() => {
    if(ongoingGptResponse.length === 0){
      return;
    }
    if(messages && messages.length > 0){
      var messageHistory = messages
      var lastMessage = messageHistory[messageHistory.length - 1];
      if(lastMessage.type !== 'bot'){
        lastMessage = { type: 'bot', content: '', timeStamp:new Date().toLocaleString() };
        messageHistory.push(lastMessage)
      }

      
      messageHistory[messageHistory.length-1] = {
        ...lastMessage,
        content: ongoingGptResponse
      }

      // console.log(messageHistory[messageHistory.length-1]);

      setMessages(messageHistory)
      }
      
  }, [ongoingGptResponse])

  const handleGptResponse = (chunkMessage) => {
    setOngoingGptResponse((prevMessage) => prevMessage+chunkMessage)
  }

  const handleSendMessage = async () => {
    if (userInput.trim() !== '') {
    //   onUserMessage(userInput);
      // Simulate Chatbot response (replace this with OpenAI API integration)
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', content: userInput, timeStamp:new Date().toLocaleString() }
      ]);

      // Simulate Chatbot response (replace this with OpenAI API integration)
      // const botResponse = `Mock response for "${userInput}"`;

      SocketService.sendMessage(userInput);
      setUserInput('');
      setOngoingGptResponseStopped(false)
    }
  };

  return (
    <div className="ChatWindow">
      <div ref={chatContainerRef} className='responseBox'>
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
        <input type="text" value={userInput} onChange={handleInputChange} placeholder='Type your text here'/>
        <button className='sendBtn' onClick={handleSendMessage}>Send</button>
        {socketRes}
      </div>
    </div>
  );
};

export default ChatWindow;

