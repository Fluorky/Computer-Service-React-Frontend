import React, { useState, useEffect } from 'react';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await getToken(); // Retrieve the token

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

  const getToken = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'MartynaSob@starnet.pl',
          password: 'Dupcia123.'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
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
    </div>
  );
}

export default CustomerList;
