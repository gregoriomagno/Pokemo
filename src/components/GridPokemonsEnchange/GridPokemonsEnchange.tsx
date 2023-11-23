import React from "react";
import CardPokemon from "../CardPokemon/CardPokemon";

interface props {
  title: string;
  listPokemons: any[];
  onClickPokemonRemoveListReceive?: (index: number) => void;
}
const GridPokemonsEnchange = ({
  title,
  listPokemons,
  onClickPokemonRemoveListReceive,
}: props) => {
  return (
    <div className="flex flex-1  flex-col  mx-4 bg-white p-4 rounded-lg shadow-md items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        {listPokemons.map((pokemon: any, index: number) => (
          <CardPokemon
            key={index}
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
    </div>
  );
};

export default GridPokemonsEnchange;
