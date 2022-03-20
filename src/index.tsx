import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {List} from "./List";

async function getPokemon() {
    const data  = await fetch('https://pokeapi.co/api/v2/pokemon');
    const pokemon = await data.json();
    return pokemon.results;
}



ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

