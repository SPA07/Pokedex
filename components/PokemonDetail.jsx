import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const PokemonDetail = () => {
    const { id } = useParams();
    const [ character, setCharacter ] = useState({});

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => setCharacter(res.data));
    }, [id]);

    

    return (
        <div className='card'>
            <div>
                <h1>Pokemon Detail</h1>
                <img src={character.sprites?.front_default} alt="" />
            </div>
        </div>
    );
};

export default PokemonDetail;