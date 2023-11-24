"use client";
import SearchBar from "@/components/SearchBar/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { getPokemonById } from "../../../services/PokemonServices";
import CardPokemon from "@/components/CardPokemon/CardPokemon";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { filterPokemonsBySearch, verifyIfreplacementFair } from "@/utils";
import { valueErroMarginExchange } from "@/constants";
import GridPokemonsEnchange from "@/components/GridPokemonsEnchange/GridPokemonsEnchange";
import { useHistoric } from "@/hooks/historic";
import ModalEnchange from "@/components/ModalEnchange/ModalEnchange";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const { addNewEnchanges } = useHistoric();
  const [searchText, setSearchText] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  const [pokemons, setPokemons] = useState<any[]>([]);
  const [pokemonsReplacementToReplace, setPokemonsReplacementToReplace] =
    useState<any[]>([]);
  const [pokemonsReplacementToReceive, setPokemonsReplacementToReceive] =
    useState<any[]>([]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  function handleSearch(text: string) {
    setSearchText(text);
  }

  const getPokemons = () => {
    var ids = [];
    for (var i = 1; i < 200; i++) {
      ids.push(i);
    }
    axios
      .all(ids.map((id) => getPokemonById(id)))
      .then((res) => setPokemons(res));
  };

  function onClickPokemon(index: number, listState: any[], setListState: React.Dispatch<React.SetStateAction<any[]>>, maxPokemons: number) {
    if (listState.length < maxPokemons) {
      setListState([...listState, pokemons[index]]);
    } else {
      toast.warn('O máximo de pokémons na troca é 6!');
    }
  }
  
  // Uso da função onClickPokemonToReceive
  function onClickPokemonToReceive(index: number) {
    onClickPokemon(index, pokemonsReplacementToReceive, setPokemonsReplacementToReceive, 6);
  }
  
  // Uso da função onClickPokemonToReplace
  function onClickPokemonToReplace(index: number) {
    onClickPokemon(index, pokemonsReplacementToReplace, setPokemonsReplacementToReplace, 6);
  }

  function onClickPokemonRemoveListReplace(index: number) {
    setPokemonsReplacementToReplace((prevPokemons) => {
      // Filtra os pokémons removendo o item com o índice específico
      const updatedPokemons = prevPokemons.filter((_, i) => i !== index);
      return updatedPokemons;
    });
  }

  function onClickPokemonRemoveListReceive(index: number) {
    setPokemonsReplacementToReceive((prevPokemons) => {
      // Filtra os pokémons removendo o item com o índice específico
      const updatedPokemons = prevPokemons.filter((_, i) => i !== index);
      return updatedPokemons;
    });
  }

  function resetExchange() {
    setPokemonsReplacementToReplace([]);
    setPokemonsReplacementToReceive([]);
  }

  function MakeExchange() {
    if(pokemonsReplacementToReplace.length > 0 &&  pokemonsReplacementToReceive.length > 0 ){
    console.log("trocar");
    addNewEnchanges(pokemonsReplacementToReceive, pokemonsReplacementToReplace);
    resetExchange();
  }else{
      toast.error('Você deve Adicionar Pokémons para a troca!');

  }
  }

  function toReplacePokemon() {
    if (
      verifyIfreplacementFair(
        pokemonsReplacementToReplace,
        pokemonsReplacementToReceive,
        valueErroMarginExchange
      )
    ) {
      MakeExchange();
    } else {
      openModal();
      console.log("trocar injusta");
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full h-full items-center justify-center mt-20 bg-green-500">
      <div className="flex flex-col w-full p-10">
        <h2 className="text-6xl font-bold text-white  text-center mb-10">
          Troca de Pokémons
        </h2>

        <div className="flex flex-1  justify-center items-center  ">
          <GridPokemonsEnchange
            title="Pokémons para Receber"
            listPokemons={pokemonsReplacementToReceive}
            onClickPokemonRemoveListReceive={onClickPokemonRemoveListReceive}
          />
          <div className="flex flex-col  justify-center items-center h-80 mx-10">
            <LiaExchangeAltSolid size={80} color="white" />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-10"
              onClick={toReplacePokemon}
            >
              Trocar
            </button>
          </div>
          <GridPokemonsEnchange
            title="Pokémons para Troca"
            listPokemons={pokemonsReplacementToReplace}
            onClickPokemonRemoveListReceive={onClickPokemonRemoveListReplace}
          />
        </div>
      </div>

      <div className="flex flex-col w-fit m-10">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-5 gap-4 mt-10 mx-2">
          {filterPokemonsBySearch(pokemons, searchText).map(
            (pokemon: any, index: number) => (
              <CardPokemon
                key={index}
                onClickButtonToReceive={() => onClickPokemonToReceive(index)}
                onClickButtonToReplace={() => onClickPokemonToReplace(index)}
                description={`EXP: ${pokemon.base_experience}`}
                imageUrl={pokemon.sprites.front_default}
                name={pokemon.name}
              />
            )
          )}
        </div>
      </div>
      <ModalEnchange
        isOpen={isModalOpen}
        onClose={closeModal}
        onClickCancel={() => {
          MakeExchange();
          closeModal();
        }}
        onClickProceed={() => {
          MakeExchange();
          closeModal();
        }}
      />
    </div>
  );
}
