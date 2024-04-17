import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import CustomerList from './pages/CustomerList';
import CustomerCrud from './pages/CustomerCrud';
import Logoff from './pages/Logoff';
import './App.css';
import ServiceRequestCrud from './pages/ServiceRequestCrud';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerlist" element={<CustomerList />} />
        <Route path="/customercrud" element={<CustomerCrud />} />
        <Route path="/servicerequestcrud" element={<ServiceRequestCrud />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logoff" element={<Logoff />} />
      </Routes>
    </Router>
  );
}

export default App;
