import React from 'react';
import Navbar from './Navbar';

function Home() {

  console.log(localStorage.getItem('token'));
  return (
    <div>
      <h2>Home</h2>
      <header className="App-header">
        <div>
        <Navbar /> 
        </div>
      </header>
    </div>
  );
}

export default Home;
