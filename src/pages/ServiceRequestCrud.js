import React, { useState, useEffect } from 'react';

function ServiceRequestCrud() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [newServiceRequest, setNewServiceRequest] = useState({
    name: '',
    price: '',
    tax: '',
    description: '',
    requested_at: '',
    completion_deadline: '',
    priority: '',
    state: '',
    requested_by: '',
    owned_by: '',
    billing_address: '',
    shipping_address: ''
  });
  const [editingServiceRequestId, setEditingServiceRequestId] = useState(null); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setServiceRequests(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e, newServiceRequest) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      for (const key in newServiceRequest) {
        formData.append(key, newServiceRequest[key]);
      }

      const response = await fetch('http://127.0.0.1:8000/api/service-requests/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add new service request');
      }

      fetchData();
    } catch (error) {
      console.error('Error adding new service request:', error);
    }
  };
  
  const handleEditServiceRequest = (serviceRequestId) => {
    setEditingServiceRequestId(serviceRequestId);
    const serviceRequestToEdit = serviceRequests.find(serviceRequest => serviceRequest.id === serviceRequestId);
    setNewServiceRequest(serviceRequestToEdit);
  };
  
  const handleUpdateServiceRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      for (const key in newServiceRequest) {
        formData.append(key, newServiceRequest[key]);
      }

      const response = await fetch(`http://127.0.0.1:8000/api/service-requests/${editingServiceRequestId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update service request');
      }

      setEditingServiceRequestId(null);
      fetchData();
    } catch (error) {
      console.error('Error updating service request:', error);
    }
  };
  
  const handleRemoveServiceRequest = async (serviceRequestId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/service-requests/${serviceRequestId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove service request');
      }

      fetchData();
    } catch (error) {
      console.error('Error removing service request:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewServiceRequest({ ...newServiceRequest, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Service Request List</h1>
      <form onSubmit={(e) => handleSubmit(e, newServiceRequest)}>
        <input type="text" name="name" placeholder="Name" value={newServiceRequest.name} onChange={handleInputChange} />
        <input type="text" name="price" placeholder="Price" value={newServiceRequest.price} onChange={handleInputChange} />
        <input type="text" name="tax" placeholder="Tax" value={newServiceRequest.tax} onChange={handleInputChange} />
        <input type="text" name="description" placeholder="Description" value={newServiceRequest.description} onChange={handleInputChange} />
        <input type="datetime-local" name="requested_at" placeholder="Requested At" value={newServiceRequest.requested_at} onChange={handleInputChange} />
        <input type="datetime-local" name="completion_deadline" placeholder="Completion Deadline" value={newServiceRequest.completion_deadline} onChange={handleInputChange} />
        <input type="text" name="priority" placeholder="Priority" value={newServiceRequest.priority} onChange={handleInputChange} />
        <input type="text" name="state" placeholder="State" value={newServiceRequest.state} onChange={handleInputChange} />
        <input type="text" name="requested_by" placeholder="Requested By" value={newServiceRequest.requested_by} onChange={handleInputChange} />
        <input type="text" name="owned_by" placeholder="Owned By" value={newServiceRequest.owned_by} onChange={handleInputChange} />
        <input type="text" name="billing_address" placeholder="Billing Address" value={newServiceRequest.billing_address} onChange={handleInputChange} />
        <input type="text" name="shipping_address" placeholder="Shipping Address" value={newServiceRequest.shipping_address} onChange={handleInputChange} />
        <button type="submit">Add Service Request</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Description</th>
            <th>Requested At</th>
            <th>Completion Deadline</th>
            <th>Priority</th>
            <th>State</th>
            <th>Requested By</th>
            <th>Owned By</th>
            <th>Billing Address</th>
            <th>Shipping Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceRequests.map(serviceRequest => (
            <tr key={serviceRequest.id}>
              <td>{serviceRequest.name}</td>
              <td>{serviceRequest.price}</td>
              <td>{serviceRequest.tax}</td>
              <td>{serviceRequest.description}</td>
              <td>{serviceRequest.requested_at}</td>
              <td>{serviceRequest.completion_deadline}</td>
              <td>{serviceRequest.priority}</td>
              <td>{serviceRequest.state}</td>
              <td>{serviceRequest.requested_by}</td>
              <td>{serviceRequest.owned_by}</td>
              <td>{serviceRequest.billing_address}</td>
              <td>{serviceRequest.shipping_address}</td>
              <td>
                {editingServiceRequestId === serviceRequest.id ? (
                  <button onClick={handleUpdateServiceRequest}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditServiceRequest(serviceRequest.id)}>Edit</button>
                    <button onClick={() => handleRemoveServiceRequest(serviceRequest.id)}>Delete</button>
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

export default ServiceRequestCrud;
