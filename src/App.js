import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import CustomerList from './pages/CustomerList';
import CustomerCrud from './pages/CustomerCrud';
import Logout from './pages/Logout';
import './App.css';
import ServiceRequestCrud from './pages/ServiceRequestCrud';
import ServiceTechnicianCrud from './pages/ServiceTechnicianCrud';
import PartCrud from './pages/PartCrud';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerlist" element={<CustomerList />} />
        <Route path="/customercrud" element={<CustomerCrud />} />
        <Route path="/servicerequestcrud" element={<ServiceRequestCrud />} />
        <Route path="/servicetechniciancrud" element={<ServiceTechnicianCrud />} />
        <Route path="/partcrud" element={<PartCrud />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
