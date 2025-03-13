// src/App.js
import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import VerifyBackupCode from './components/VerifyBackupCode';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Multi-Factor Authentication (MFA) System</h1>
            <Register />
            <hr />
            <Login />
            <hr />
            <VerifyBackupCode />
        </div>
    );
}

export default App;