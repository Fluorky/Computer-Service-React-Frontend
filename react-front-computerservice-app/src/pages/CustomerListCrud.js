import React, { useState, useEffect } from 'react';
import getToken from '../GetToken';
import '../App.css';

function CustomerListCrud() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    service_requests: 1
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await getToken();

      const response = await fetch('http://127.0.0.1:8000/api/customers/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      console.log(newCustomer)
      const response = await fetch('http://127.0.0.1:8000/api/customers/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
      });

      if (!response.ok) {
        throw new Error('Failed to add new customer');
      }

      // Refresh customer list after successful creation
      fetchData();
    } catch (error) {
      console.error('Error adding new customer:', error);
    }
  };

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            Name: {customer.name} Surname: {customer.surname} Email: {customer.email} <br />
            Phone number: {customer.phone_number} Address: {customer.address} Service requests: {customer.service_requests}
          </li>
        ))}
      </ul>

      {/* Form to add a new customer */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={newCustomer.name} onChange={handleInputChange} />
        <input type="text" name="surname" placeholder="Surname" value={newCustomer.surname} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} />
        <input type="text" name="phone_number" placeholder="Phone Number" value={newCustomer.phone_number} onChange={handleInputChange} />
        <input type="text" name="service_requests" placeholder="Service Requests" value={newCustomer.service_requests} onChange={handleInputChange} />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}
/*<input type="text" name="address" placeholder="Address" value={newCustomer.address} onChange={handleInputChange} />*/

export default CustomerListCrud;
