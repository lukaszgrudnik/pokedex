interface ISprites {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default:string | null
    front_female: string | null 
    front_shiny: string | null
    front_shiny_female: string | null
}

interface IType {
    name: string
    url: string
}

interface IAbility{
    name: string
}

interface IAbilities{
    ability: IAbility
}

interface ITypes {
    slot: number
    type: IType
}

interface IFeatures { 
    types: ITypes[]
    sprites: ISprites | null
    abilities: IAbilities[]
    weight: number
    height: number
}

interface IPokemon {

    name: string
    features: IFeatures

}


export type {IPokemon, IFeatures, ISprites, ITypes, IType};