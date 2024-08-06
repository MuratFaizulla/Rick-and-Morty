import React from 'react';
import { Link } from 'react-router-dom';
import './LocationCard.css'; // Import the CSS file

const LocationCard = ({ location }) => {
  return (
    <div className="location-card">
       <div className='location-name' >
       <Link to={`/location/${location.id}`}><h3>{location.name} </h3></Link> <span> -  {location.type}</span>
    </div>
      <p>{location.dimension}</p>
    </div>
  );
};

export default LocationCard;

