import React from "react";
import CardPokemon from "../CardPokemon/CardPokemon";

import { IPokemon } from "@/types/Pokemon";

interface props {
  title: string;
  listPokemons: IPokemon[];
  removeItem?: boolean;
  onClickPokemonRemoveListReceive?: (index: number) => void;
}
const GridPokemonsEnchange = ({
  title,
  listPokemons,
  removeItem = true,
  onClickPokemonRemoveListReceive,
}: props) => {
  return (
    <div className="flex  flex-col flex-1  mx-4 bg-white p-4 rounded-lg shadow-md items-center h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>

      {listPokemons.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 ">
          {listPokemons.map((pokemon: IPokemon, index: number) => (
            <CardPokemon
              key={index}
              showButtonRemove={removeItem}
              onClickButtonToRemove={() =>
                !!onClickPokemonRemoveListReceive &&
                onClickPokemonRemoveListReceive(index)
              }
              isSmallVersion={true}
              description={`EXP: ${pokemon?.base_experience}`}
              imageUrl={pokemon?.sprites.front_default}
              name={pokemon?.name}
            />
          ))}
        </div>
      ) : (
        <div className=" flex  flex-1  justify-center items-center h-56 ">
          <h3 className="text-1xl font-bold text-gray-500  text-center mb-10">
            Nenhum pokémon selecionado!
          </h3>
        </div>
      )}
    </div>
  );
};

export default GridPokemonsEnchange;
