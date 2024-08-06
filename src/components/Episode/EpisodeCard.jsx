import React from 'react';
import { Link } from 'react-router-dom';
import './EpisodeCard.css';

const EpisodeCard = ({ episode }) => {
  return (
    <div className="episode-card">
      <div className='episode-name' >
      <Link to={`/episode/${episode.id}`}> <h3>{episode.name} </h3> </Link><span> -  {episode.episode}</span>
      </div>
      <p>{episode.air_date}</p>
    </div>
  );
};

export default EpisodeCard;
