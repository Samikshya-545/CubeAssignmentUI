// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function ChatUI() {
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const response = await axios.post('http://127.0.0.1:5001/chat', { user_input: userInput }, { withCredentials: true });
      setBotResponse(response.data.bot_response);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with a non-2xx status:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  

  return (
    <div className="chatBotUi">
      <h1>Chatbot UI</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Your Message:
          <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        </label>
        <button type="submit">Send</button>
      </form>
      {botResponse && (
        <div className="response">
          <strong>Bot Response:</strong> {botResponse}
        </div>
      )}
    </div>
  );
}

export default ChatUI;
