import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CharacterCard.css';

const CharacterCard = ({ character }) => {
  const [firstEpisodeName, setFirstEpisodeName] = useState('');

  useEffect(() => {
    const fetchFirstEpisode = async () => {
      if (character && character.episode.length > 0) {
        try {
          const firstEpisodeUrl = character.episode[0];
          const response = await axios.get(firstEpisodeUrl);
          setFirstEpisodeName(response.data.name);
        } catch (error) {
          console.error('Error fetching first episode:', error);
        }
      }
    };

    fetchFirstEpisode();
  }, [character]);

  const extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-card">
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
        {firstEpisodeName ? (
          <Link to={`/episode/${extractIdFromUrl(character.episode[0])}`}>{firstEpisodeName}</Link>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
