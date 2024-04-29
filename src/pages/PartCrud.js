import React, { useState, useEffect } from 'react';
import '../App.css';

function PartCrud() {
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState({
    name: '',
    price: '',
    tax: '',
    description: '',
    quantity_in_stock: '',
    supplier: ''
  });
  const [editingPartId, setEditingPartId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/parts/', {
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
      setParts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e, newPart) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new URLSearchParams();

      Object.entries(newPart).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('http://127.0.0.1:8000/api/parts/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      if (!response.ok) {
        throw new Error('Failed to add new part');
      }

      fetchData();
    } catch (error) {
      console.error('Error adding new part:', error);
    }
  };

  const handleEditPart = (partId) => {
    setEditingPartId(partId);
    const partToEdit = parts.find(part => part.id === partId);
    setNewPart(partToEdit);
  };

  const handleUpdatePart = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new URLSearchParams();

      Object.entries(newPart).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(`http://127.0.0.1:8000/api/parts/${editingPartId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      if (!response.ok) {
        throw new Error('Failed to update part');
      }

      setEditingPartId(null);
      fetchData();
    } catch (error) {
      console.error('Error updating part:', error);
    }
  };

  const handleRemovePart = async (partId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/parts/${partId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove part');
      }

      fetchData();
    } catch (error) {
      console.error('Error removing part:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewPart({ ...newPart, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Part List</h1>
      <form onSubmit={(e) => handleSubmit(e, newPart)}>
        <input type="text" name="name" placeholder="Name" value={newPart.name} onChange={handleInputChange} />
        <input type="number" name="price" placeholder="Price" value={newPart.price} onChange={handleInputChange} />
        <input type="text" name="tax" placeholder="Tax" value={newPart.tax} onChange={handleInputChange} />
        <textarea name="description" placeholder="Description" value={newPart.description} onChange={handleInputChange} />
        <input type="number" name="quantity_in_stock" placeholder="Quantity in Stock" value={newPart.quantity_in_stock} onChange={handleInputChange} />
        <input type="text" name="supplier" placeholder="Supplier" value={newPart.supplier} onChange={handleInputChange} />
        <button type="submit">Add Part</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Description</th>
            <th>Quantity in Stock</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parts.map(part => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.price}</td>
              <td>{part.tax}</td>
              <td>{part.description}</td>
              <td>{part.quantity_in_stock}</td>
              <td>{part.supplier}</td>
              <td>
                {editingPartId === part.id ? (
                  <button onClick={handleUpdatePart}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditPart(part.id)}>Edit</button>
                    <button onClick={() => handleRemovePart(part.id)}>Delete</button>
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

export default PartCrud;
