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

    console.log(character);

    return (
        <div className='card-container'>
            <div className="card-style">
                <h1>Pokemon Detail</h1>
                <img src={character.sprites?.other?.dream_world?.front_default} alt="" />
            </div>
        </div>
    );
};

export default PokemonDetail;