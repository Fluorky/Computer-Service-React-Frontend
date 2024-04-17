import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppToken from './AppToken';
import Home from './pages/Home'
import Login from './pages/Login';
import CustomerList from './pages/CustomerList';
import CustomerCrud from './pages/CustomerCrud';
import Logoff from './pages/Logoff';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerlist" element={<CustomerList />} />
        <Route path="/customercrud" element={<CustomerCrud />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apptoken" element={<AppToken />} />
        <Route path="/logoff" element={<Logoff />} />
      </Routes>
    </Router>
  );
}

export default App;
