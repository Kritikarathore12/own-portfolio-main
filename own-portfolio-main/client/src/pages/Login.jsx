import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Invalid Credentials');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
            <form onSubmit={handleSubmit} className="contact-card">
                <div style={{ marginBottom: '15px' }}>
                    <input
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px' }}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
            </form>
        </div>
    );
};

export default Login;
