import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import "../src/stylesPokedex.css";

const Pokedex = () => {
  const name = useSelector((state) => state.userName);
  const navigate = useNavigate();

  const [ pokemonList, setPokemonList ] = useState([]);
  const [ pokemonName, setPokemonName ] = useState("");
  const [ pokemonType, setPokemonType ] = useState([]);

  useEffect(() => {
    //Se hace la peticion a la API para traer los pokemon existentes
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((res) => setPokemonList(res.data.results));

    //Se hace peticion para filtrado de pokemon por tipo
    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((res) => setPokemonType(res.data.results));
  }, []);

  // console.log(pokemonType);

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

  //Paginacion
  const [page, setPage] = useState(1);
  const pokemonPerPage = 10;

  //Esta constante se multiplica y nos da el incide del objeto en el que nos encontramos
  //Por lo cual pasa a la siguiente constante
  const lastPokemonIndex = page * pokemonPerPage;

  //La primera pagina sera la resta del ultimo indice - la cantidad de objetos que se requieren por pagina
  //Dando asi la posicion sobre la cual se van a imprimir en pantalla
  const firstPokemonIndex = lastPokemonIndex - pokemonPerPage;

  //Se particiona el arreglo
  const pokemonPaginated = pokemonList.slice(
    firstPokemonIndex,
    lastPokemonIndex
  );

  // Limite de paginacion hacia adelante
  //ceil -> redondea hacia arriba
  const totalPage = Math.ceil(pokemonList.length / pokemonPerPage);
  console.log(totalPage)

  
  const [actualNum, setActualNum] = useState(1);
  const [buttons, setButtons] = useState(5);
  
  let pagesNumbers = [];
  for (let i = actualNum; i <= buttons; i++) {
    pagesNumbers.push(i);
  }

  const next = () => {
    setActualNum(actualNum + 5) 
    setButtons(buttons + 5)
    setPage(actualNum)
  }

  const back = () => {
    setActualNum(actualNum - 5);
    setButtons(buttons - 5)
    setPage(actualNum)
  }

  return (
    <div id="pokedex-container">
      <header className="headaer-pokedex">
        <div className="header-red"></div>
        <div className="image-header-container">
          <div className="image-header-little"></div>
        </div>
        <div className="header-black"></div>
      </header>

      <div className="welcome-container">
        {/* <h1>Pokedex</h1> */}
        <p>
          <b>Welcome {name},</b>{" "}
          <span>here you will see your favorite pokemon.</span>
        </p>
      </div>

      <div className="pokedex-input-container">
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
        {pokemonPaginated.map((pokemon) => (
          <div className="card-container">
            <PokemonCard key={pokemon.url} url={pokemon.url} />
          </div>
        ))}
      </div>
      <div id="btn-pagination">
         <button id="btn" onClick={() => back()} disabled={actualNum === 1}>
         <i className="fa-solid fa-circle-left"></i>
         </button>
        {pagesNumbers.map((number) => (
          <button id="pagination" onClick={() => setPage(number)}>{number}</button>
        ))}
        <button id="btn" onClick={() => next()} disabled={totalPage <= buttons}>
          <i className="fa-solid fa-circle-right"></i>
        </button>
        
      </div>
    </div>
  );
};

export default Pokedex;