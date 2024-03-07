import logo from './logo.svg';
import './App.css';
import CustomerList from './CustomerList';
import { useState, useEffect } from 'react';
import getToken from './GetToken'; // Import getToken function from GetToken.js

function App() {
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
      <header className="App-header">
        <CustomerList token={token} /> {/* Pass the token to CustomerList component */}
      </header>

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

export default App;
