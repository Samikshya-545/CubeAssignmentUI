import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import '../style/Sign-in.css';
import googleLogo from '../images/google_logo.png';
import { useNavigate } from 'react-router-dom';


function SignIn() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(profile);
                        console.log('res',res.data);
                        const authID = res.data.id;
                        console.log("authID",authID)
                        localStorage.setItem('authenticationToken',JSON.stringify(res.data));
                        navigate('/chat');
                        window.location.reload();
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div className='signInContainer'>
            <div className='signInTab'>
                <div className='heading'>Welcome To BotTalker</div>
                <div className='tagLine'>Where Chat Meets Intelligence</div>
                <br />
                <br />
                {profile == null ? (
                    <div>
                    </div>
                ) : (
                    <button className='btn' onClick={() => login()}>
                        <img className='googleLogoContainer' src={googleLogo} alt='Google Logo'/>
                        SignIn With Google 🚀 </button>
                )}
            </div>
        </div>
    );
}
export default SignIn;