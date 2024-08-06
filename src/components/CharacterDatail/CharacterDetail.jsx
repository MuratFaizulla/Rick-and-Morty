import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CharacterDetail.css';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
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

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);

        // Fetch episodes
        const episodePromises = response.data.episode.map((url) => axios.get(url));
        const episodeResponses = await Promise.all(episodePromises);
        setEpisodes(episodeResponses.map((res) => res.data));
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  const extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-detail">
      <h2 className='title'>Character: {character.name}</h2>
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
          <Link to={`/episode/${extractIdFromUrl(character.episode[0])}`}>{firstEpisodeName}</Link>
        </div>
      </div>

      <h3 className='title'>Episodes</h3>
      <div className="episodes-container">
        {episodes.map((episode) => (
          <div className="episode-card">
          <div className='episode-name' >
          <Link to={`/episode/${episode.id}`}> <h3>{episode.name} </h3> </Link><span> -  {episode.episode}</span>
          </div>
          <p>{episode.air_date}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterDetail;
