import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid Credentials');
        }
    };

    return (
        <div className="auth-form glass-card">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Welcome Back</h2>
            {error && <p style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email Address"
                    required
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
            </form>
            <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Register</Link>
            </p>
        </div>
    );
};

export default Login;
