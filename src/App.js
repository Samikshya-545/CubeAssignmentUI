import logo from './logo.svg';
import './App.css';
import SignIn from './components/Sign-in';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ChatApp from './components/ChatApp';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
function App() {
  const authToken = localStorage.getItem('authenticationToken');
  console.log(authToken);
  return (
    <GoogleOAuthProvider clientId="597242329325-jbest067o3g2t1cq6aupuq2s3cb78oqh.apps.googleusercontent.com">
        <React.StrictMode>
        <BrowserRouter>
        {authToken == null &&(
          <Routes>
            <Route path="/" exact element={<SignIn/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
        {authToken != null && (
          <Routes>
            <Route path="/chat" exact element={<ChatApp/>} />
            <Route path="*" element={<Navigate to="/chat" />} />
          </Routes>
        )}
        </BrowserRouter>
        </React.StrictMode>
    </GoogleOAuthProvider>
  );
}

export default App;
