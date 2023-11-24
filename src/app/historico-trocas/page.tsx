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
import AccordionItem from "@/components/AccordionItem/AccordionItem";

export default function HistoricoTrocas() {
  const { dataHistoricoExchanges } = useHistoric();
  const [openTrade, setOpenTrade] = useState(null);

  const toggleTrade = (index: any) => {
    setOpenTrade(openTrade === index ? null : index);
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full items-center  mt-20 bg-green-500">
      <div className="flex flex-col w-full p-10 ">
        <h2 className="text-6xl font-bold text-white  text-center mb-10">
          Histórico - Trocas de Pokémons
        </h2>

        <div className=" flex flex-1 flex-col bg-white rounded-lg p-4">
          {dataHistoricoExchanges.length > 0 ? (
            <ul>
              {dataHistoricoExchanges?.map((enchange, index) => (
                <AccordionItem key={index} title={`Troca ${index + 1}`}>
                  <div className="flex flex-1 items-center ">
                    <GridPokemonsEnchange
                      title="Pokémons Recebidos"
                      removeItem={false}
                      listPokemons={enchange.pokemonsReplacementToReceive}
                    />
                    <LiaExchangeAltSolid size={80} color="green" />

                    <GridPokemonsEnchange
                      title="Pokémons Trocados"
                      removeItem={false}

                      listPokemons={enchange.pokemonsReplacementToReplace}
                    />
                  </div>
                </AccordionItem>
              ))}
            </ul>
          ) : (
            <div className=" flex  justify-center items-center h-56 ">
              <h3 className="text-4xl font-bold text-black  text-center mb-10">
                Nenhuma troca foi realizada ainda !
              </h3>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
