"use client";
import { createContext, useEffect, useState } from "react";

export interface IHistoricContext {
  dataHistoricoExchanges: any[];
  setDataHistoricoExchanges: (data: any[]) => void;
  addNewEnchanges: (receive: any[], replace: any[]) => void;
}

export const HistoricContext = createContext({} as IHistoricContext);

type StateProviderProps = {
  children?: React.ReactNode;
};

const HistoricProvider = ({ children }: StateProviderProps) => {
  const [dataHistoricoExchanges, setDataHistoricoExchanges] = useState<any[]>(
    []
  );

  function addNewEnchanges(receive: any[], replace: any[]) {
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
