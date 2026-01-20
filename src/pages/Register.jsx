import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="auth-form glass-card">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
            {error && <p style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    required
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
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
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register</button>
            </form>
            <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
            </p>
        </div>
    );
};

export default Register;
