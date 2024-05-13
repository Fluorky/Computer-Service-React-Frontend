import React, { useState, useEffect } from 'react';
import '../App.css';

function CustomerCrud() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    address: '',
    service_requests: '' // Updated to be a string instead of a number
  });
  const [addressData, setAddressData] = useState([]);
  const [serviceRequestsData, setServiceRequestsData] = useState([]); // New state for service requests data
  const [editingCustomerId, setEditingCustomerId] = useState(null); // Track the ID of the customer being edited

  useEffect(() => {
    fetchData();
    fetchAddress();
    fetchServiceRequests(); // Fetch service requests data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
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

  const fetchAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/address/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch address data');
      }
  
      const addressData = await response.json();
      setAddressData(addressData);
    } catch (error) {
      console.error('Error fetching address data:', error);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/service-requests/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch service requests data');
      }

      const serviceRequestsData = await response.json();
      setServiceRequestsData(serviceRequestsData);
    } catch (error) {
      console.error('Error fetching service requests data:', error);
    }
  };

  const handleSubmit = async (e, newCustomer) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append('name', newCustomer.name);
      formData.append('surname', newCustomer.surname);
      formData.append('email', newCustomer.email);
      formData.append('phone_number', newCustomer.phone_number);
      formData.append('address', newCustomer.address);
      formData.append('service_requests', newCustomer.service_requests);

      const response = await fetch('http://127.0.0.1:8000/api/customers/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: formData
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
    const customerToEdit = customers.find(customer => customer.id === customerId);
    setNewCustomer(prevCustomer => ({
      ...prevCustomer,
      name: customerToEdit.name,
      surname: customerToEdit.surname,
      email: customerToEdit.email,
      phone_number: customerToEdit.phone_number,
      address: customerToEdit.address,
      service_requests: customerToEdit.service_requests
    }));
  };
  
  const handleUpdateCustomer = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append('name', newCustomer.name);
      formData.append('surname', newCustomer.surname);
      formData.append('email', newCustomer.email);
      formData.append('phone_number', newCustomer.phone_number);
      formData.append('address', newCustomer.address);
      formData.append('service_requests', newCustomer.service_requests);

      const response = await fetch(`http://127.0.0.1:8000/api/customers/${editingCustomerId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      setEditingCustomerId(null);
      fetchData();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleRemoveCustomer = async (customerId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/customers/${customerId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove customer');
      }

      fetchData();
    } catch (error) {
      console.error('Error removing customer:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prevCustomer => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const selectedAddressId = e.target.value;
    setNewCustomer(prevCustomer => ({
      ...prevCustomer,
      address: selectedAddressId
    }));
  };

  const handleServiceRequestChange = (e) => {
    const selectedServiceRequestId = e.target.value;
    setNewCustomer(prevCustomer => ({
      ...prevCustomer,
      service_requests: selectedServiceRequestId
    }));
  };

  return (
    <div>
      <h1>Customer List</h1>
 
      <form onSubmit={(e) => handleSubmit(e, newCustomer)}>
        <input type="text" name="name" placeholder="Name" value={newCustomer.name} onChange={handleInputChange} />
        <input type="text" name="surname" placeholder="Surname" value={newCustomer.surname} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} />
        <input type="text" name="phone_number" placeholder="Phone Number" value={newCustomer.phone_number} onChange={handleInputChange} />
        <select name="address" value={newCustomer.address} onChange={handleAddressChange}>
          <option value="">Select Address</option>
          {addressData.map(address => (
            <option key={address.id} value={address.id}>{`${address.address_line1}, ${address.address_line2}, ${address.city}, ${address.country}`}</option>
          ))}
        </select>
        <select name="service_requests" value={newCustomer.service_requests} onChange={handleServiceRequestChange}>
          <option value="">Select Service Request</option>
          {serviceRequestsData.map(serviceRequest => (
            <option key={serviceRequest.id} value={serviceRequest.id}>{`${serviceRequest.name}`}</option>
          ))}
        </select>
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
            <td>
              {customer.address && (
                <>
                  <p>{addressData.find(address => address.id === customer.address)?.address_line1}</p>
                  <p>{addressData.find(address => address.id === customer.address)?.address_line2}</p>
                  <p>{addressData.find(address => address.id === customer.address)?.city}</p>
                  <p>{addressData.find(address => address.id === customer.address)?.country}</p>
                  <p>{addressData.find(address => address.id === customer.address)?.postal_code}</p>
                </>
              )}
            </td>
            <td>
            {customer.service_requests && (
              <>
                {customer.service_requests.map(requestId => (
                  <p key={requestId}>
                    {serviceRequestsData.find(serviceRequest => serviceRequest.id === requestId)?.name}
                  </p>
                ))}
              </>
            )}
            </td>
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

export default CustomerCrud;