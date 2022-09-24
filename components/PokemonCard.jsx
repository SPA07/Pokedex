import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ url }) => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios.get(url).then((res) => setCharacter(res.data));
  }, []);

  console.log(character)

  return (
    <div>
      <div onClick={() => navigate(`/character/${character.id}`)}>
        <h3>{character.name}</h3>
        <img
          src={character.sprites?.other?.dream_world?.front_default}
          alt="imagen"
        />
      </div>
    </div>
  );
};

export default PokemonCard;
