import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import FCFS from './Pages/FCFS';
import Navbar from './components/Navbar';
import SJF from './Pages/SJF';
import PSA from './Pages/PSA';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import RR from './Pages/RR';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fcfs" element={<FCFS />} />
                    <Route path="/psa" element={<PSA />} />
                    <Route path="/sjf" element={<SJF />} />
                    <Route path="/rr" element={<RR />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;