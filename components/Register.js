// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mfaSecret, setMfaSecret] = useState('');
    const [backupCodes, setBackupCodes] = useState([]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', { username, password });
            setMfaSecret(response.data.mfaSecret);
            setBackupCodes(response.data.backupCodes);
            alert('Registration successful! Scan the QR code with your authenticator app.');
        } catch (error) {
            alert('Registration failed: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>

            {mfaSecret && (
                <div>
                    <h3>Scan this QR code with your authenticator app:</h3>
                    <QRCode value={`otpauth://totp/MFA-MERN:${username}?secret=${mfaSecret}&issuer=MFA-MERN`} />
                    <h3>Backup Codes:</h3>
                    <ul>
                        {backupCodes.map((code, index) => (
                            <li key={index}>{code}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Register;