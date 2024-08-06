import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Episodes.css';
import EpisodeCard from '../../components/Episode/EpisodeCard';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); 

  const fetchEpisodes = async (page) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
      setEpisodes(prevEpisodes => [...prevEpisodes, ...response.data.results]);
      
      if (!response.data.info.next) {
        setHasMore(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes(page);
  }, [page]);

  const handleSeeMore = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true); 
  };

  if (loading && episodes.length === 0) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="episodes">
      <h2 className='title'>Episodes</h2>
      <div className="episodes-container">
        {episodes.map((episode) => (
          <EpisodeCard key={episode._id} episode={episode} />
        ))}
      </div>
      {hasMore && (
        <div className="see-more-container">
          <button className="see-more-button" onClick={handleSeeMore}>See more</button>
        </div>
      )}
    </div>
  );
}

export default Episodes;
