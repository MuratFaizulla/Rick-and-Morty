import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { CHARACTER_ROUTE, EPISODES_ROUTE, LOCATIONS_ROUTE } from '../utils/consts';

function Home() {
  return (
   <>
      <div className="App">
        <div className="half-screen white-section">
          <header className="App-header">
            <h1>Rick and Morty</h1>
          </header>
        </div>
        <div className="half-screen black-section">
          <div className="navigation">
            <Link to={CHARACTER_ROUTE}>Characters</Link>
            <Link to={EPISODES_ROUTE}>Episodes</Link>
            <Link to={LOCATIONS_ROUTE}>Locations</Link>
          </div>
        </div>
      </div>
     
      </>
  );
}

export default Home;
