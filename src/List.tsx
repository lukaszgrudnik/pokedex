import * as React from "react";
import {Pokemon} from "./Pokemon";
import "./css/list.css";
import "./css/search.css";
import { off } from "process";

interface IState {
    pokemon: any[]
    value: string
    isSearched: boolean
    click_handler: (props: any)=>void

}

interface IProps{
    handle_pokemon: (props: any)=>void
}


class List extends React.Component<IProps, IState >{

    constructor(props: IProps){
        super(props);
        this.state = {
            pokemon: [],
            value: '',
            isSearched: false,
            click_handler: props.handle_pokemon
        }
    }
    

    async fetch_pokemon(offset: number, limit: number) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data =  await response.json();
        return data.results;
    }

    async componentDidMount() {
        // Fetches pokemon from API:  
        const data: any[] = await this.fetch_pokemon(0, 20);
        const pokemon = data.map((el, index)=>{ return {name: el.name, url: el.url, id:  index}})
        this.setState({pokemon: pokemon});
    }
    
    search(event: any ){
        const input: HTMLInputElement = event.target;
        const value: string = input.value;
        if(value.length > 0) this.setState({isSearched: true});
        else this.setState({isSearched: false});
        this.setState({value: value});        
    }

    async more (e: any) {
        if(!this.state.isSearched){
            const offset = this.state.pokemon.length;
            const data: any[] = await this.fetch_pokemon(offset, 20);
            const new_pokemon = data.map((el, index)=>{ return {name: el.name, url: el.url, id:  offset + index}})
            const pokemon = this.state.pokemon.concat(new_pokemon);
            this.setState({pokemon: pokemon});
        }
    }


    render() {
        return(
            <div className="list">

                <input className="search" onKeyUp={this.search.bind(this)} type="text" placeholder="Search by name"/>                        
                  
                <div className={"pokemon-list"} >
                    {this.state.pokemon.filter(pok => pok.name.toLowerCase().trim().includes(this.state.value.trim().toLowerCase())).map((pokemon)=> <Pokemon key={pokemon.id} click_handler={this.state.click_handler} url={pokemon.url} name={pokemon.name}/>)}
                </div>

                <button onClick={this.more.bind(this)} className="more-button">MORE</button>
            
            </div>
        )
    }

}

export {List}
