import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationCard from '../../components/Location/LocationCard';
import './Locations.css'; 

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1); 
  const [hasMorePages, setHasMorePages] = useState(true); 

  const fetchLocations = async (page) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}`);
      setLocations(prevLocations => [...prevLocations, ...response.data.results]);
      
      if (!response.data.info.next) {
        setHasMorePages(false); 
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchLocations(page); 
  }, [page]);

  const handleSeeMore = () => {
    setPage(prevPage => prevPage + 1); 
  };

  return (
    <div className="locations">
      <h1 className='title'>Locations</h1>
      <div className="locations-container">
        {locations.map(location => (
          <LocationCard key={location._id} location={location} />
        ))}
      </div>
      {hasMorePages && (
        <div className="see-more-container">
          <button className="see-more-button" onClick={handleSeeMore}>See more</button>
        </div>
      )}
    </div>
  );
};

export default Locations;
