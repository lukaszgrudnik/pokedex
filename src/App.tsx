import * as React from 'react';
import {List} from "./List";

import "./css/darkmode.css";
import "./css/darkmode-switch.css";
import "./css/header.css";
import "./css/pokemon-extended-view.css";

import { IPokemon } from './IPokemon';

interface IState{
    darkmode: boolean
    pokemon: IPokemon | null
}


class App extends React.Component<any, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            darkmode: false,
            pokemon: null
        }

    }

    display (pokemon: any) {
        console.log(pokemon.features);
        this.setState({pokemon: pokemon});
    }

    renderPokemon(){
        if(this.state.pokemon === null)
        return null

        else 
        return(
            <div className='pokemon-extended'>

                <i className='material-icons close-icon' onClick={()=>this.setState({pokemon: null})}>close</i>

                <div className='sprite-frame'>
                    <img src={this.state.pokemon.features.sprites?.front_default || ''} alt="" />
                </div>

                <p className='name'>{this.state.pokemon.name}</p>

                <div className='types'>
                    {this.state.pokemon.features.types.map((el, index)=> <p className='pokemon-type' key={index}>{el.type.name}</p>)}
                </div>


                <div className='stats'>   
                    <div className='dimensions'>
                        <h3>Height</h3>
                        <p className='height'>{this.state.pokemon.features.height}"</p>
                        <h3>Weight</h3>
                        <p className='weight'>{this.state.pokemon.features.weight} lbs</p>
                    </div>
                    <div className='abilities'>
                        <h3>Abilities</h3>
                        {this.state.pokemon.features.abilities.map((el, index)=><p key={index} className='ability'>{el.ability.name}</p>)}
                    </div>
                </div>
            </div>
        )

    }


    render() {
        return <div className={this.state.darkmode ? 'app-darkmode' : 'app'}>

            <header>

                <div className='circle'>

                </div>

            </header>

            {
               this.renderPokemon()
            }

            <div className='content'>

                    {/* Dark theme switch: */}
                    <div className={'darkmode-switch'}>
                        <label htmlFor={'darkmode-switch-checkbox'}>Dark Mode</label>
                        <input onClick={() => this.setState({darkmode: !this.state.darkmode})} id={'darkmode-switch-checkbox'}
                            type="checkbox"/>
                    </div>

                    <List handle_pokemon={this.display.bind(this)}/>

            </div>
    
        </div>;
    }
}

export {App};