import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './LocationDetails.css';

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [firstEpisodes, setFirstEpisodes] = useState({}); // To store first episodes of each character
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationAndCharacters = async () => {
      try {
        // Fetch the location details
        const locationResponse = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
        setLocation(locationResponse.data);

        // Fetch characters
        const characterPromises = locationResponse.data.residents.map((url) => axios.get(url));
        const characterResponses = await Promise.all(characterPromises);
        const charactersData = characterResponses.map((res) => res.data);
        setCharacters(charactersData);

        // Fetch the first episode for each character
        const firstEpisodeUrls = charactersData.flatMap(character => character.episode.slice(0, 1));
        const firstEpisodePromises = firstEpisodeUrls.map(url => axios.get(url));
        const firstEpisodeResponses = await Promise.all(firstEpisodePromises);
        const firstEpisodesData = firstEpisodeResponses.reduce((acc, curr) => {
          acc[extractIdFromUrl(curr.data.url)] = curr.data; // Use extractIdFromUrl to get the id
          return acc;
        }, {});
        setFirstEpisodes(firstEpisodesData);

      } catch (err) {
        setError('Error fetching location details');
        console.error('Error fetching location:', err);
      }
    };

    fetchLocationAndCharacters();
  }, [id]);

  const extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div className="location-details">
      <h2 className='title'>Location: {location.name}</h2>

      <div className="location-card">
        <div className='location-name'>
          <Link to={`/location/${location.id}`}><h3>{location.name}</h3></Link> <span> - {location.type}</span>
        </div>
        <p>{location.dimension}</p>
      </div>

      <h3 className='title'>Characters</h3>
      <div className="characters-container">
        {characters.length > 0 ? (
          characters.map((character) => {
            const firstEpisodeId = extractIdFromUrl(character.episode[0]);
            const firstEpisode = firstEpisodes[firstEpisodeId] || {};

            return (
              <div key={character.id} className="character-card">
                <img src={character.image} alt={character.name} />
                <div className="character-details">
                  <h2>
                    <Link to={`/character/${character.id}`}>{character.name}</Link>
                  </h2>
                  <p>
                    <span className={`status ${character.status.toLowerCase()}`}></span>
                    {character.status} - {character.species}
                  </p>

                  <p className='details'><strong>Last known location:</strong></p>
                  <Link to={`/location/${extractIdFromUrl(character.location.url)}`}>{character.location.name}</Link>

                  <p className='details'><strong>First seen in:</strong></p>
                  <Link to={`/episode/${firstEpisode.id}`}>{firstEpisode.name || 'Unknown Episode'}</Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>No characters found.</p>
        )}
      </div>
    </div>
  );
};

export default LocationDetails;
