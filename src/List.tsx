import * as React from "react";
import {Pokemon} from "./Pokemon";


class List extends React.Component{

    state = {
        pokemon: []
    }

    async componentDidMount() {
        const data  = await fetch('https://pokeapi.co/api/v2/pokemon');
        const pokemon = await data.json();
        this.setState({pokemon: pokemon.results});
    }

    // Generates list ..
    render() {
        return <div className={"List"}>
            {this.state.pokemon.map((pok, index) => <Pokemon key={index} {...pok["name"]}/>)}
        </div>
    }
}





export {List};