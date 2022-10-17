import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import types from "../src/types.json";
import pokemonCol from "../src/pokemonCol.json";
import head from "../src/assets/head-intro.png";
import pokeball from "../src/assets/pokebola.png";
import "../src/details.css";

const PokemonDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [moves, setMoves] = useState([]);
  console.log(moves);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setCharacter(res.data));
  }, [id]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/move/")
      .then((res) => setMoves(res.data.results));
  }, []);

  const colors = () => {
    const arrColor = [];
    types.map((pokemonColor, index) => {
      if (character.types?.[0].type?.name === pokemonColor) {
        arrColor.push(pokemonCol[index]);
      }
    });
    return arrColor;
  };

  const calculateWidth = (base_stat, max) => {
    return base_stat ? `${(Number(base_stat) / max) * 100}%` : 0;
  };

  // console.log(character);
  return (
    <div className="card-details-container">
      <header className="details-header-pokedex">
        <img
          className="details-image-header"
          src={head}
          alt="image"
        />
        <div className="details-black-header-container">
          <div className="details-black-header-circle">
            <div className="details-little-header-black-circle"></div>
          </div>
        </div>
      </header>
      <section className="main-container">
        <div className="pokemon-detail-container">
          <div className="header-detail" style={{ background: colors() }}>
            <div className="pokemon-id" style={{ color: colors() }}>
              <p>#{character.id}</p>
            </div>
            <img
              id="detail-pokemon-img-container"
              src={character.sprites?.other?.dream_world?.front_default}
              alt=""
            />
          </div>

          <h3 className="details-name" style={{ color: colors() }}>
            {character.name}
          </h3>
          <div className="info">
            <div className="stat">
              <p style={{ color: colors() }}>
                Weight <br />
                <span>{character.weight}</span>
              </p>
              <p style={{ color: colors() }}>
                Height <br />
                <span>{character.height}</span>
              </p>
            </div>
          </div>
          <img
            className="pokeball-img"
            src={pokeball}
            alt="pokeball-img"
          />
        </div>

        <div className="stats-container">
          <div id="stadistics">
            <h2>Stats</h2>
            <div className="stat-field">
              <b>HP</b>
              <b>{character.stats?.[0].base_stat}/150</b>
            </div>
            <div className="progress-container">
              <div
                className="progress"
                style={{
                  width: calculateWidth(character.stats?.[0].base_stat, 150),
                  background: colors(),
                }}
              ></div>
            </div>

            <div className="stat-field">
              <b>Attack</b>
              <b>{character.stats?.[1].base_stat}/150</b>
            </div>
            <div className="progress-container">
              <div
                className="progress"
                style={{
                  width: calculateWidth(character.stats?.[1].base_stat, 150),
                  background: colors(),
                }}
              ></div>
            </div>

            <div className="stat-field">
              <b>Defense</b>
              <b>{character.stats?.[2].base_stat}/150</b>
            </div>
            <div className="progress-container">
              <div
                className="progress"
                style={{
                  width: calculateWidth(character.stats?.[2].base_stat, 150),
                  background: colors(),
                }}
              ></div>
            </div>

            <div className="stat-field">
              <b>Speed</b>
              <b>{character.stats?.[5].base_stat}/150</b>
            </div>
            <div className="progress-container">
              <div
                className="progress"
                style={{
                  width: calculateWidth(character.stats?.[5].base_stat, 150),
                  background: colors(),
                }}
              ></div>
            </div>
          </div>
          <section className="skills-container">
            <h4 style={{ borderBottom: `2px solid ${colors()}` }}>Skills</h4>
            <div className="skills">
              {character.abilities?.map((ability) => (
                <span
                  key={ability.ability.name}
                  className="ability"
                  style={{ background: colors() }}
                >
                  {ability.ability.name.replace("-", " ")}
                </span>
              ))}
            </div>
          </section>
          <section className="pokemon-type-container">
            <h4 style={{ borderBottom: `2px solid ${colors()}` }}>Type</h4>
            <div className="pokemon-type">
              {character.types?.map((type) => (
                <span
                  key={type.type.name}
                  className="ability"
                  style={{ background: colors() }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </section>
        </div>
        <div id="moves">
          <div id="title">
            <h2>MOVEMENTS</h2>
          </div>
          {moves.map((move) => (
            <ul>
              <li style={{ background: colors() }}>{move.name}</li>
            </ul>
          ))}
        </div>
      </section>
    </div>

  );
};

export default PokemonDetail;
