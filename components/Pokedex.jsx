import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import "../src/stylesPokedex.css"

const Pokedex = () => {
  const name = useSelector((state) => state.userName);
  const navigate = useNavigate();

  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonType, setPokemonType] = useState([]);

  useEffect(() => {
    //Se hace la peticion a la API para traer los pokemon existentes
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => setPokemonList(res.data.results));

    //Se hace peticion para filtrado de pokemon por tipo
    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((res) => setPokemonType(res.data.results));
  }, []);

  console.log(pokemonType);

  //Buscando pokemon a traves de una funcion y un input controlado
  const searchPokemon = () => {
    navigate(`/character/${pokemonName}`);
  };

  //Filtrando pokemon por tipo
  const filterByType = (typeUrl) => {
    axios
      .get(typeUrl)
      .then((res) =>
        setPokemonList(res.data.pokemon.map((pokemon) => pokemon.pokemon))
      );
  };

  return (
    <div className="pokedex-container">
      <h1>Pokedex</h1>
      <p>
        <span>Welcome {name}</span>, here you will see your favorite pokemon.
      </p>

      <div className="input-container">
        <input
          type="text"
          placeholder="Pokemon name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={searchPokemon}>Search</button>
      </div>

      <div className="pokemon-selector">
        <select onChange={(e) => filterByType(e.target.value)}>
          <option value="">Select pokemon type</option>
          {pokemonType.map((type) => (
            <option value={type.url} key={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pokemon-container">
        {pokemonList.map((pokemon) => (
          <div className="card-container">
            <PokemonCard key={pokemon.url} url={pokemon.url} />
          </div>
        ))}
      </div>
      <footer className="footer-pokedex">
        <div className="footer-red"></div>
        <div className="image-footer-container">
          <div className="image-footer-little"></div>
        </div>
        <div className="footer-black"></div>
      </footer>
    </div>
  );
};

export default Pokedex;
