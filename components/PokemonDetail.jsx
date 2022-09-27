import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import types from "../public/types.json";
import pokemonCol from "../public/pokemonCol.json";
import "../src/details.css";

const PokemonDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setCharacter(res.data));
  }, [id]);

  const colors = () => {
    const arrColor = [];
    types.map((pokemonColor, index) => {
      if (character.types?.[0].type?.name === pokemonColor) {
        arrColor.push(pokemonCol[index]);
      }
    });
    return arrColor;
  };

  console.log(character);
  return (
    <div className="card-details-container">
      <section className="head" style={{ background: colors() }}></section>
      <section className="card-detail"></section>
      <img
        id="pokemon-detail"
        src={character.sprites?.other?.dream_world?.front_default}
        alt=""
      />
      <section className="name-head">
        <div className="pokemon-id" style={{ color: colors() }}>
          #{character.id}
        </div>
        <h3 style={{ color: colors() }}>{character.name}</h3>
        <div className="info">
          <p style={{ color: colors() }}>Weight</p>
          <p style={{ color: colors() }}>Height </p>
        </div>
        <div className="num">
          <p style={{ color: colors() }}>{character.weight}</p>
          <p style={{ color: colors() }}>{character.height}</p>
        </div>
      </section>

      <section id="pokemon-type">
        <p><b>Type</b></p>
        <h4 style={{ color: colors() }}>
          {character.types?.[0].type?.name}/{character.types?.[1].type?.name}
        </h4>
      </section>
    </div>
  );
};

export default PokemonDetail;
