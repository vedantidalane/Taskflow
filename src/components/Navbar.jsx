import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, CheckSquare } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="nav">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}>
                <CheckSquare color="#6366f1" />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>TaskFlow</h2>
            </Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <span>Welcome, <strong>{user.name}</strong></span>
                        <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>
                            <LogOut size={18} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
