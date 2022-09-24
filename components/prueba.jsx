const name = useSelector((state) => state.userName);
const [pokemonList, setPokemonList] = useState([]);
const [inputSearch, setInputSearch] = useState('');
const [type, setType] = useState([]);
const navigate = useNavigate();
useEffect(() => {
  axios
    .get('https://pokeapi.co/api/v2/type/')
    .then((res) => setType(res.data.results));
  axios
    .get('https://pokeapi.co/api/v2/pokemon/')
    .then((res) => setPokemonList(res.data.results));
}, []);
const searchName = () => {
  navigate(`/pokemon/${inputSearch}`);
};
const searchType = (typeUrl) => {
  axios.get(typeUrl).then((res) => setPokemonList(res.data.pokemon.map(pokemon => pokemon.pokemon)));
};
console.log(pokemonList);
return (
  <div>
    <h1>Pokemon general</h1>
    <p>Welcome {name}</p>
    <div>
      <input
        type="text"
        placeholder="search for name"
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />
      <button onClick={searchName}>search</button>
    </div>
    <div>
      <select onChange={(e) => searchType(e.target.value)}>
        <option value="">Select one Type</option>
        {type.map((types) => (
          <option value={types.url} key={types.url}>
            {types.name}
          </option>
        ))}
      </select>
    </div>
    <ul>
      {pokemonList.map((pokemon) => (
        <PokemonCard url={pokemon.url } key={pokemon.url} />
      ))}
    </ul>
  </div>
);
};
export default Pokemons;