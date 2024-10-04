import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-links px-8  py-2 ">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/fcfs">First Come First Serve</Link></li>
                <li><Link to="/sjf">Shortest Job First</Link></li>
                <li><Link to="/psa">Priority Scheduling Algorithm</Link></li>
                <li><Link to="/rr">Round Robin</Link></li>
                {/* Add more links for other routes if needed */}
            </ul>
        </nav>
    );
};

export default Navbar;