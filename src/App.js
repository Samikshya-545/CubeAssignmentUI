import logo from './logo.svg';
import './App.css';
import ChatUI from './components/ChatUI';
import SignIn from './components/Sign-in';
import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ChatApp from './components/ChatApp';

function App() {
  return (
    <GoogleOAuthProvider clientId="597242329325-jbest067o3g2t1cq6aupuq2s3cb78oqh.apps.googleusercontent.com">
        <React.StrictMode>
            <ChatApp />
        </React.StrictMode>
    </GoogleOAuthProvider>
  );
}

export default App;
