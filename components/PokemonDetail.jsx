import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import types from "../src/types.json";
import pokemonCol from "../src/pokemonCol.json";
import "../src/details.css";

const PokemonDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [moves, setMoves] = useState([]);
  console.log(moves)

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setCharacter(res.data));
  }, [id]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/move/")
    .then((res) => setMoves(res.data.results))
  }, [])

  const colors = () => {
    const arrColor = [];
    types.map((pokemonColor, index) => {
      if (character.types?.[0].type?.name === pokemonColor) {
        arrColor.push(pokemonCol[index]);
      }
    });
    return arrColor;
  };

  // console.log(character);
  return (
    <div className="card-details-container">
      <section className="head" style={{ background: colors() }}></section>
      <section className="card-detail"></section>
      <img
        id="pokemon-detail"
        src={character.sprites?.other?.dream_world?.front_default}
        alt=""
      />

      <div className="main-data-container">

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
        <h4>Type</h4>
        <p style={{ color: colors() }}>
          {character.types?.[0]?.type?.name} /{" "}
          {character.types?.[1]?.type?.name}
        </p>
      </section>
      
      </div>

      <section id="skills">
        <h4>Skills</h4>
        <p style={{ color: colors() }}>
          {character.abilities?.[0]?.ability.name} /{" "}
          {character.abilities?.[1]?.ability.name}
        </p>
      </section>

      <section id="stats">
        <p>HP: {character.stats?.[0].base_stat} / 150</p>
        <progress
          value={character.stats?.[0].base_stat}
          min="0"
          max="150"
        ></progress>
        <p>Attack: {character.stats?.[1].base_stat} / 150</p>
        <progress
          value={character.stats?.[1].base_stat}
          min="0"
          max="150"
        ></progress>
        <p>Defense: {character.stats?.[2].base_stat} / 150</p>
        <progress
          value={character.stats?.[2].base_stat}
          min="0"
          max="150"
        ></progress>
        <p>Speed: {character.stats?.[3].base_stat} / 150</p>
        <progress
          value={character.stats?.[3].base_stat}
          min="0"
          max="150"
        ></progress>
      </section>
      
      <div id="moves" style={{background: colors() }}>
      <div id="title"><h2>MOVEMENTS</h2></div>
        {
          moves.map((move) => (
            <ul>
              <li>
                {move.name}
              </li>
            </ul>
          ))
        }
      </div>

    </div>
  );
};

export default PokemonDetail;
