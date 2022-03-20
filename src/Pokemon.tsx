import * as React from 'react';
import "./Pokemon.css";


interface PokemonState{
    name?: string
}


class Pokemon extends React.Component< {}, PokemonState>{

    constructor(data: any){
        super(data);
        console.log(data);
    }

    render(){
        return <div className="Pokemon">
            {/*<h2>{this.state.name}</h2>*/}
        </div>
    }
}

export {Pokemon};