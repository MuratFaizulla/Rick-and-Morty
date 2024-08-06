import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './EpisodeDetail.css';

const EpisodeDetail = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [firstEpisodes, setFirstEpisodes] = useState({}); // To store the first episodes of each character

  useEffect(() => {
    const fetchEpisodeAndCharacters = async () => {
      try {
        // Fetch the episode details
        const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
        setEpisode(episodeResponse.data);

        // Fetch characters
        const characterPromises = episodeResponse.data.characters.map((url) => axios.get(url));
        const characterResponses = await Promise.all(characterPromises);
        const charactersData = characterResponses.map((res) => res.data);
        setCharacters(charactersData);

        // Fetch the first episode for each character
        const firstEpisodeUrls = charactersData.flatMap(character => character.episode.slice(0, 1));
        const firstEpisodePromises = firstEpisodeUrls.map(url => axios.get(url));
        const firstEpisodeResponses = await Promise.all(firstEpisodePromises);
        const firstEpisodesData = firstEpisodeResponses.reduce((acc, curr) => {
          acc[curr.data.id] = curr.data;
          return acc;
        }, {});
        setFirstEpisodes(firstEpisodesData);

      } catch (error) {
        console.error('Error fetching episode or characters:', error);
      }
    };

    fetchEpisodeAndCharacters();
  }, [id]);

  const extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  if (!episode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="episode-detail">
      <h2 className='title'>Episode: {episode.name}</h2>
      <div className="episode-card">
        <div className='episode-name'>
          <Link to={`/episode/${episode.id}`}><h3>{episode.name}</h3></Link><span> - {episode.episode}</span>
        </div>
        <p>{episode.air_date}</p>
      </div>

      <h3 className='title'>Characters</h3>
      <div className="characters-container">
        {characters.map((character) => {
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
        })}
      </div>
    </div>
  );
};

export default EpisodeDetail;
