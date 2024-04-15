const qs = require('qs');

const getToken = async () => {
  try {
    const data = qs.stringify({
      'username': 'admin@testhub.com',
      'password': 'password123.' 
    });

    const config = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    };

    const response = await fetch('http://127.0.0.1:8000/api/token/', config);
    
    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }

    const responseData = await response.json();
    const token = responseData.token; // Assuming the token key is 'token', change it according to your API response
    console.log('Token:', token); // Log the token to the console
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

module.exports = getToken;
