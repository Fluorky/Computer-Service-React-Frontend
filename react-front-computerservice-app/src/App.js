import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppToken from './AppToken';
import Home from './pages/Home'
import Login from './pages/Login';
import CustomerList from './pages/CustomerList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerlist" element={<CustomerList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apptoken" element={<AppToken />} />
      </Routes>
    </Router>
  );
}

export default App;
