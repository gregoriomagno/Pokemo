"use client";
import SearchBar from "@/components/SearchBar/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import CardPokemon from "@/components/CardPokemon/CardPokemon";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { filterPokemonsBySearch, verifyIfreplacementFair } from "@/utils";
import {
  maxNumberPokemonsPerExchange,
  numPokemons,
  valueErroMarginExchange,
} from "@/constants";
import GridPokemonsEnchange from "@/components/GridPokemonsEnchange/GridPokemonsEnchange";
import { useHistoric } from "@/hooks/historic";
import ModalEnchange from "@/components/ModalEnchange/ModalEnchange";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IPokemon } from "@/types/Pokemon";
import { getPokemonById } from "@/services/PokemonServices";
import SkeletonCardPokemon from "@/components/CardPokemon/SkeletonCardPokemon";
export default function Home() {
  const { addNewEnchanges } = useHistoric();
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [enchangeFair, setEnchangeFair] = useState(false);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [pokemonsReplacementToReplace, setPokemonsReplacementToReplace] =
    useState<IPokemon[]>([]);
  const [pokemonsReplacementToReceive, setPokemonsReplacementToReceive] =
    useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  function handleSearch(text: string) {
    setSearchText(text);
  }

  const getPokemons = () => {
    setIsLoading(true);

    try {
      var ids = [];
      for (var i = 1; i < numPokemons; i++) {
        ids.push(i);
      }
      axios
        .all(ids.map((id) => getPokemonById(id)))
        .then((res) => {
          setPokemons(res);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(`Erro ao buscar listagem de Pokémons`);
        });
    } catch (err) {
      setIsLoading(false);
      toast.error(`Erro ao buscar listagem de Pokémons`);
    }
  };

  function onClickPokemon(
    index: number,
    listState: IPokemon[],
    setListState: React.Dispatch<React.SetStateAction<IPokemon[]>>,
    maxPokemons: number
  ) {
    if (listState.length < maxPokemons) {
      setListState([...listState, pokemons[index]]);
    } else {
      toast.warn(
        `O máximo de pokémons na troca é ${maxNumberPokemonsPerExchange}!`
      );
    }
  }

  // Uso da função onClickPokemonToReceive
  function onClickPokemonToReceive(index: number) {
    onClickPokemon(
      index,
      pokemonsReplacementToReceive,
      setPokemonsReplacementToReceive,
      maxNumberPokemonsPerExchange
    );
  }

  // Uso da função onClickPokemonToReplace
  function onClickPokemonToReplace(index: number) {
    onClickPokemon(
      index,
      pokemonsReplacementToReplace,
      setPokemonsReplacementToReplace,
      maxNumberPokemonsPerExchange
    );
  }

  function removePokemonAtIndex(
    index: number,
    setPokemons: React.Dispatch<React.SetStateAction<IPokemon[]>>,
    prevPokemons: IPokemon[]
  ) {
    const updatedPokemons = prevPokemons.filter((_, i) => i !== index);
    setPokemons(updatedPokemons);
  }

  function onClickPokemonRemoveListReplace(index: number) {
    removePokemonAtIndex(
      index,
      setPokemonsReplacementToReplace,
      pokemonsReplacementToReplace
    );
  }

  function onClickPokemonRemoveListReceive(index: number) {
    removePokemonAtIndex(
      index,
      setPokemonsReplacementToReceive,
      pokemonsReplacementToReceive
    );
  }

  function resetExchange() {
    setPokemonsReplacementToReplace([]);
    setPokemonsReplacementToReceive([]);
  }

  function MakeExchange() {
    if (
      pokemonsReplacementToReplace.length > 0 &&
      pokemonsReplacementToReceive.length > 0
    ) {
      addNewEnchanges(
        pokemonsReplacementToReceive,
        pokemonsReplacementToReplace
      );
      toast.success("Troca realizada com sucesso!");

      resetExchange();
    } else {
      toast.error("Você deve Adicionar Pokémons para a troca!");
    }
  }

  function toReplacePokemon() {
    const fair = verifyIfreplacementFair(
      pokemonsReplacementToReplace,
      pokemonsReplacementToReceive,
      valueErroMarginExchange
    );
    setEnchangeFair(fair);

    openModal();
  }

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full h-full items-center justify-center mt-20 bg-green-500">
      <div className="flex flex-col w-full p-10">
        <h2 className="  text-3xl md:text-6xl font-bold text-white  text-center mb-10">
          Ranqueador de Trocas Pokémons
        </h2>

        <div className="flex flex-1 flex-col lg:flex-row justify-center items-center h-1/2 ">
          <GridPokemonsEnchange
            title="Pokémons para Troca"
            listPokemons={pokemonsReplacementToReplace}
            onClickPokemonRemoveListReceive={onClickPokemonRemoveListReplace}
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
            title="Pokémons para Receber"
            listPokemons={pokemonsReplacementToReceive}
            onClickPokemonRemoveListReceive={onClickPokemonRemoveListReceive}
          />
        </div>
      </div>

      <div className="flex flex-col w-2/3 m-10">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10 mx-2">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCardPokemon key={index} />
              ))
            : filterPokemonsBySearch(pokemons, searchText).map(
                (pokemon: IPokemon, index: number) => (
                  <CardPokemon
                    key={index}
                    onClickButtonToReceive={() =>
                      onClickPokemonToReceive(index)
                    }
                    onClickButtonToReplace={() =>
                      onClickPokemonToReplace(index)
                    }
                    description={`EXP: ${pokemon.base_experience}`}
                    imageUrl={pokemon.sprites.front_default}
                    name={pokemon.name}
                  />
                )
              )}
        </div>
      </div>
      <ModalEnchange
        enchangeFair={enchangeFair}
        isOpen={isModalOpen}
        onClose={closeModal}
        onClickCancel={() => {
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
