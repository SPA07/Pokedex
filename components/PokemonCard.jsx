import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import types from '../public/types.json'
import pokemonCol from '../public/pokemonCol.json'
import "../src/cardStyles.css";

const PokemonCard = ({ url }) => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log(character);

  useEffect(() => {
    axios.get(url).then((res) => setCharacter(res.data)),
      setTimeout(() => {
        setIsLoading(false);
      }, 150);
  }, [url]);

  const colors = () => {
    const arrColor = [];
    types.map((pokemonColor, index) => {
      if(character.types?.[0].type?.name === pokemonColor){
        arrColor.push(pokemonCol[index])
      }
    }) 
    return arrColor
  }

  return (
    <div>
      <div className="card"  style={{background: colors()}} onClick={() => navigate(`/character/${character.id}`)}>
        {isLoading ? (
          <SpinnerDotted className="spinner" />
        ) : (
          <>
            <section className="image-pokemon-container">
              <img id="img-pok" src={character.sprites?.front_default} alt={character.sprites?.back_default}/>
            </section>
            <section className="name-container">
              <h3 style={{color: colors()}}>{character.name}</h3>
              <p>Tipo {character.types?.[0].type?.name}</p>
            </section>
            <section className="pokemon-information">
              <p style={{color: colors()}}>HP <br /><span>{character.stats?.[0]?.base_stat}</span></p>
              <p style={{color: colors()}}>Weight <br /><span>{character.weight}</span></p>
              <p style={{color: colors()}}>Attack <br /><span>{character.stats?.[1]?.base_stat}</span></p>
              <p style={{color: colors()}}>Defense <br /><span>{character.stats?.[2]?.base_stat}</span></p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
