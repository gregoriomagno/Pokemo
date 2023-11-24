import axios from "axios";

/** API PI DIGITAL */
const baseURL = process.env.NEXT_PUBLIC_API_POKEMON;

export const apiPokemon = axios.create({ baseURL: baseURL })