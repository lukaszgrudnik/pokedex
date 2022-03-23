import { type } from '@testing-library/user-event/dist/type';
import * as React from 'react';
import "./css/pokemon.css";
import {IFeatures, IPokemon} from "./IPokemon";

interface IState {
    name: string
    url: string
    features: IFeatures
    isMounted: boolean
    click_handler: (pokemon: IPokemon)=>void
}

interface IProps {
    name: string
    url: string
    click_handler: (pokemon: IPokemon)=>void
}


class Pokemon extends React.Component<IProps, IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            name: props.name,
            url: props.url,
            features: {
                types: [],
                sprites: null,
                abilities: [],
                weight: 0,
                height: 0
            },
            isMounted: false,
            click_handler: props.click_handler
        }
    }

    async fetch_features(url: string){
        const response = await fetch(url);
        return await response.json();
    }

    async componentDidMount(){
        const features: IFeatures = await this.fetch_features(this.state.url);
        this.setState({features: features});
        this.setState({isMounted: true});
    }

    componentWillUnmount(){
        this.setState({isMounted: false});
    }


    click () {
        const pokemon: IPokemon = {
            name: this.state.name,
            features: this.state.features
        }
        this.state.click_handler(pokemon);
    }

    render() {
        return <div onClick={this.click.bind(this)} className={"pokemon"}>

            <div className={"sprite"}>
            
                <img src={this.state.features.sprites?.front_default || ''} alt="" />
            
            </div>

            <div className={'pokemon-info'}>
                <h2>{this.state.name}</h2>

                <div className={'pokemon-type-list'}>
                    {
                        this.state.features.types.map((el, index)=> <p className='pokemon-type' key={index}>{el.type.name}</p>)
                    }
                </div>

            </div>
        </div>
    }
}

export { Pokemon };