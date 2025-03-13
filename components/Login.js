// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mfaSecret, setMfaSecret] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [token, setToken] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setMfaSecret(response.data.mfaSecret);
            setQrCode(response.data.qrCode);
            alert('Please verify your TOTP code.');
        } catch (error) {
            alert('Login failed: ' + error.response.data.message);
        }
    };

    const handleVerifyTOTP = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verify-totp', { username, token });
            alert('Login successful! Token: ' + response.data.accessToken);
        } catch (error) {
            alert('TOTP verification failed: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            {qrCode && (
                <div>
                    <h3>Enter TOTP Code:</h3>
                    <input
                        type="text"
                        placeholder="TOTP Code"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <button onClick={handleVerifyTOTP}>Verify TOTP</button>
                </div>
            )}
        </div>
    );
};

export default Login;