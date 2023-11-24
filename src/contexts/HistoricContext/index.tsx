"use client";
import { IExchange } from "@/types/Exchange";
import { IPokemon } from "@/types/Pokemon";
import { createContext, useState } from "react";

export interface IHistoricContext {
  dataHistoricoExchanges: IExchange[];
  setDataHistoricoExchanges: (data: IExchange[]) => void;
  addNewEnchanges: (receive: IPokemon[], replace: IPokemon[]) => void;
}

export const HistoricContext = createContext({} as IHistoricContext);

type StateProviderProps = {
  children?: React.ReactNode;
};

const HistoricProvider = ({ children }: StateProviderProps) => {
  const [dataHistoricoExchanges, setDataHistoricoExchanges] = useState<IExchange[]>(
    []
  );

  function addNewEnchanges(receive: IPokemon[], replace: IPokemon[]) {
    setDataHistoricoExchanges([
      ...dataHistoricoExchanges,
      {
        pokemonsReplacementToReceive: receive,
        pokemonsReplacementToReplace: replace,
      },
    ]);
  }
  return (
    <HistoricContext.Provider
      value={{
        dataHistoricoExchanges,
        setDataHistoricoExchanges,
        addNewEnchanges
      }}
    >
      {children}
    </HistoricContext.Provider>
  );
};

export default HistoricProvider;
