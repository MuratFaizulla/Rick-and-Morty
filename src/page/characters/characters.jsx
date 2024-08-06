import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import ItemCharacterCard from '../../components/Character/ItemCharacterCard';
import './Characters.css'; 

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); 
  // const navigate = useNavigate();

  const fetchCharacters = async (page) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      setCharacters(prevCharacters => [...prevCharacters, ...response.data.results]);

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
    fetchCharacters(page); 
  }, [page]);

  const handleSeeMore = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true); 
  };

  // const handleBack = () => {
  //   navigate(-1); 
  // };

  if (loading && characters.length === 0) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className='characters'>
     <div className="back-button-container">
      {/* <button className="back-button" onClick={handleBack}> # </button> */}
      <p className="title">Characters</p>
    </div>
      <div className="characters-container">
        <ItemCharacterCard characters={characters} />
      </div>
      {hasMore && (
        <div className="see-more-container">
          <button className="see-more-button" onClick={handleSeeMore}>See more</button>
        </div>
      )}
    </div>
  );
};

export default Characters;
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 hPhvO styles__Back-sc-1ki9szf-1 DJboP"></svg>