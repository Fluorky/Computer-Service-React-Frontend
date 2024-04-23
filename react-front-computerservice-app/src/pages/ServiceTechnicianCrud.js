import React, { useState, useEffect } from 'react';

function ServiceTechnicianCrud() {
  const [serviceTechnicians, setServiceTechnicians] = useState([]);
  const [newServiceTechnician, setNewServiceTechnician] = useState({
    username: '',
    first_name: '',
    last_name: '',
    specialization: '',
    email: '',
    password: '',
    phone_number: '',
  });
  const [editingServiceTechnicianId, setEditingServiceTechnicianId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/service-technicians/', {
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
      setServiceTechnicians(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e, newServiceTechnician) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new URLSearchParams();

      for (const key in newServiceTechnician) {
        formData.append(key, newServiceTechnician[key]);
      }

      const response = await fetch('http://127.0.0.1:8000/api/service-technicians/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      if (!response.ok) {
        throw new Error('Failed to add new service technician');
      }

      fetchData();
    } catch (error) {
      console.error('Error adding new service technician:', error);
    }
  };
  
  const handleEditServiceTechnician = (serviceTechnicianId) => {
    setEditingServiceTechnicianId(serviceTechnicianId);
    const serviceTechnicianToEdit = serviceTechnicians.find(serviceTechnician => serviceTechnician.id === serviceTechnicianId);
    setNewServiceTechnician(serviceTechnicianToEdit);
  };
  
 const handleUpdateServiceTechnician = async () => {
  try {
    const token = localStorage.getItem('token');
    const formData = new URLSearchParams();

    // Exclude last_login, groups, and user_permissions if they are empty or not needed for update
    for (const key in newServiceTechnician) {
      if (key !== 'last_login' && key !== 'groups' && key !== 'user_permissions') {
        formData.append(key, newServiceTechnician[key]);
      }
    }

    const response = await fetch(`http://127.0.0.1:8000/api/service-technicians/${editingServiceTechnicianId}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    if (!response.ok) {
      throw new Error('Failed to update service technician');
    }

    setEditingServiceTechnicianId(null);
    fetchData();
  } catch (error) {
    console.error('Error updating service technician:', error);
  }
  };

  const handleRemoveServiceTechnician = async (serviceTechnicianId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/service-technicians/${serviceTechnicianId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove service technician');
      }

      fetchData();
    } catch (error) {
      console.error('Error removing service technician:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewServiceTechnician({ ...newServiceTechnician, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Service Technician List</h1>
      <form onSubmit={(e) => handleSubmit(e, newServiceTechnician)}>
        <input type="text" name="username" placeholder="Username" value={newServiceTechnician.username} onChange={handleInputChange} />
        <input type="text" name="first_name" placeholder="First Name" value={newServiceTechnician.first_name} onChange={handleInputChange} />
        <input type="text" name="last_name" placeholder="Last Name" value={newServiceTechnician.last_name} onChange={handleInputChange} />
        <input type="text" name="specialization" placeholder="Specialization" value={newServiceTechnician.specialization} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={newServiceTechnician.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={newServiceTechnician.password} onChange={handleInputChange} />
        <input type="text" name="phone_number" placeholder="Phone Number" value={newServiceTechnician.phone_number} onChange={handleInputChange} />
        <button type="submit">Add Service Technician</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Specialization</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceTechnicians.map(serviceTechnician => (
            <tr key={serviceTechnician.id}>
              <td>{serviceTechnician.username}</td>
              <td>{serviceTechnician.first_name}</td>
              <td>{serviceTechnician.last_name}</td>
              <td>{serviceTechnician.specialization}</td>
              <td>{serviceTechnician.email}</td>
              <td>{serviceTechnician.phone_number}</td>
              <td>
                {editingServiceTechnicianId === serviceTechnician.id ? (
                  <button onClick={handleUpdateServiceTechnician}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditServiceTechnician(serviceTechnician.id)}>Edit</button>
                    <button onClick={() => handleRemoveServiceTechnician(serviceTechnician.id)}>Delete</button>
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

export default ServiceTechnicianCrud;
