import { IPokemon } from "./Pokemon"

export interface IExchange{
    pokemonsReplacementToReceive: IPokemon[]
    pokemonsReplacementToReplace:IPokemon[]
}