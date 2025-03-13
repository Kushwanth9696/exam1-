// src/components/VerifyBackupCode.js
import React, { useState } from 'react';
import axios from 'axios';

const VerifyBackupCode = () => {
    const [username, setUsername] = useState('');
    const [backupCode, setBackupCode] = useState('');

    const handleVerifyBackupCode = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verify-backup-code', { username, backupCode });
            alert('Backup code verified! Token: ' + response.data.accessToken);
        } catch (error) {
            alert('Backup code verification failed: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Verify Backup Code</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Backup Code"
                value={backupCode}
                onChange={(e) => setBackupCode(e.target.value)}
            />
            <button onClick={handleVerifyBackupCode}>Verify Backup Code</button>
        </div>
    );
};

export default VerifyBackupCode;