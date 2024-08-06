import React from 'react';
import CharacterCard from './CharacterCard';

const ItemCharacterCard = ({ characters }) => {
  return (
    <div className="character-list">
      {characters.map((character) => {
        // console.log(`Rendering character with ID: ${character.id}`);
        return <CharacterCard key={character._id} character={character} />;
      })}
    </div>
  );
};

export default ItemCharacterCard;
