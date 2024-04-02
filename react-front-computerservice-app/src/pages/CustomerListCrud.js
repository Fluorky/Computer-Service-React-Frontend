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
  const [editingCustomerId, setEditingCustomerId] = useState(null); // Track the ID of the customer being edited

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

  const handleSubmit = async (e, newCustomer) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const formData = new URLSearchParams();

      formData.append('name', newCustomer.name);
      formData.append('surname', newCustomer.surname);
      formData.append('email', newCustomer.email);
      formData.append('phone_number', newCustomer.phone_number);
      formData.append('service_requests', newCustomer.service_requests);

      const response = await fetch('http://127.0.0.1:8000/api/customers/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      if (!response.ok) {
        throw new Error('Failed to add new customer');
      }

      fetchData();
    } catch (error) {
      console.error('Error adding new customer:', error);
    }
  };
  
  const handleEditCustomer = (customerId) => {
    setEditingCustomerId(customerId);
    // Find the customer being edited by ID and set their details to the form fields
    const customerToEdit = customers.find(customer => customer.id === customerId);
    setNewCustomer(customerToEdit);
  };
  
  const handleUpdateCustomer = async () => {
    try {
      const token = await getToken();
      const formData = new URLSearchParams();

      formData.append('name', newCustomer.name);
      formData.append('surname', newCustomer.surname);
      formData.append('email', newCustomer.email);
      formData.append('phone_number', newCustomer.phone_number);
      formData.append('service_requests', newCustomer.service_requests);

      const response = await fetch(`http://127.0.0.1:8000/api/customers/${editingCustomerId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      // Clear the editing state and fetch updated customer list
      setEditingCustomerId(null);
      fetchData();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };
  
  const handleRemoveCustomer = async (customerId) => {
    try {
      const token = await getToken();
      const response = await fetch(`http://127.0.0.1:8000/api/customers/${customerId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove customer');
      }

      // Fetch updated customer list after successful deletion
      fetchData();
    } catch (error) {
      console.error('Error removing customer:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Customer List</h1>
 
    <form onSubmit={(e) => handleSubmit(e, newCustomer)}>
        <input type="text" name="name" placeholder="Name" value={newCustomer.name} onChange={handleInputChange} />
        <input type="text" name="surname" placeholder="Surname" value={newCustomer.surname} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} />
        <input type="text" name="phone_number" placeholder="Phone Number" value={newCustomer.phone_number} onChange={handleInputChange} />
        <input type="text" name="service_requests" placeholder="Service Requests" value={newCustomer.service_requests} onChange={handleInputChange} />
        <button type="submit">Add Customer</button>
    </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Service Requests</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.surname}</td>
              <td>{customer.email}</td>
              <td>{customer.phone_number}</td>
              <td>{customer.address}</td>
              <td>{customer.service_requests}</td>
              <td>
                {editingCustomerId === customer.id ? (
                  <button onClick={handleUpdateCustomer}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditCustomer(customer.id)}>Edit</button>
                    <button onClick={() => handleRemoveCustomer(customer.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerListCrud;
