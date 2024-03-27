import React, { useState, useEffect } from 'react'; // Import React along with other hooks
import './App.css';
import getToken from './GetToken'; // Import getToken function from GetToken.js

function AppToken() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    try {
      const token = await getToken(); // Call the getToken function to fetch the token
      setToken(token); // Set the token in state
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  return (
    <div className="App">
      {token ? (
        <div>
          <p>Token: {token}</p>
          {/* Add any additional components or content here */}
        </div>
      ) : (
        <p>Loading token...</p>
      )}
    </div>
  );
}

export default AppToken;
