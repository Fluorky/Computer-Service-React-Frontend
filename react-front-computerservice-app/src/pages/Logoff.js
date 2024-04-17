import React from 'react';

function Logoff() {
  // Function to handle logoff
  const handleLogoff = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Redirect to the login page or any other page as needed
    // For simplicity, let's redirect to the login page
    window.location.href = '/login'; // Replace '/login' with your login page route
  };

  return (
    <div>
      <h2>Logoff</h2>
      <p>Are you sure you want to log off?</p>
      <button onClick={handleLogoff}>Log Off</button>
    </div>
  );
}

export default Logoff;
