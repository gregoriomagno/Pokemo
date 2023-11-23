"use client";
import SearchBar from "@/components/SearchBar/SearchBar";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPokemonById } from "../../../services/PokemonServices";
import CardPokemon from "@/components/CardPokemon/CardPokemon";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { verifyIfreplacementFair } from "@/utils";
import { valueErroMarginExchange } from "@/constants";
import Modal from "@/components/Modal/Modal";
import GridPokemonsEnchange from "@/components/GridPokemonsEnchange/GridPokemonsEnchange";
import { useHistoric } from "@/hooks/historic";

export default function Home() {
  const { addNewEnchanges } = useHistoric();

  const [isModalOpen, setModalOpen] = useState(false);

  const [pokemons, setPokemons] = useState<any[]>([]);
  const [pokemonsReplacementToReplace, setPokemonsReplacementToReplace] =
    useState<any[]>([]);
  const [pokemonsReplacementToReceive, setPokemonsReplacementToReceive] =
    useState<any[]>([]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const getPokemons = () => {
    var ids = [];
    for (var i = 1; i < 200; i++) {
      ids.push(i);
    }
    axios
      .all(ids.map((id) => getPokemonById(id)))
      .then((res) => setPokemons(res));
  };

  function onClickPokemonToReceive(index: number) {
    if (pokemonsReplacementToReceive.length < 6) {
      setPokemonsReplacementToReceive([
        ...pokemonsReplacementToReceive,
        pokemons[index],
      ]);
    } else {
      //toast
    }
  }
  function onClickPokemonToReplace(index: number) {
    if (pokemonsReplacementToReplace.length < 6) {
      setPokemonsReplacementToReplace([
        ...pokemonsReplacementToReplace,
        pokemons[index],
      ]);
    } else {
      //toast
    }
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
    console.log("trocar");
    addNewEnchanges(pokemonsReplacementToReceive, pokemonsReplacementToReplace);
    resetExchange();
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
        <SearchBar />
        <div className="grid grid-cols-5 gap-4 mt-10 mx-2">
          {pokemons.map((pokemon: any, index: number) => (
            <CardPokemon
              key={index}
              onClickButtonToReceive={() => onClickPokemonToReceive(index)}
              onClickButtonToReplace={() => onClickPokemonToReplace(index)}
              description={`EXP: ${pokemon.base_experience}`}
              imageUrl={pokemon.sprites.front_default}
              name={pokemon.name}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-4 ">
          <h1 className="text-2xl font-bold mb-4">Troca Injusta</h1>
          <p>
            A troca que você deseja realizar é considerada injusta, deseja
            proceguir ? .
          </p>
          <div className="flex flex-1 justify-between">
            <button
              onClick={() => {
                resetExchange();
                closeModal();
              }}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={MakeExchange}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Continuar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
