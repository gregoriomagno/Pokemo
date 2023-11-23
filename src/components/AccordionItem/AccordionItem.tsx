"use client";
import React, { useState } from "react";
import GridPokemonsEnchange from "../GridPokemonsEnchange/GridPokemonsEnchange";
import { LiaExchangeAltSolid } from "react-icons/lia";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="flex items-center justify-between bg-gray-200 p-3 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <span
          className={`transform ${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform`}
        >
          &#9650;
        </span>
      </div>
      {isOpen && <div className="p-3 bg-gray-100">{children}</div>}
    </div>
  );
};





export default AccordionItem;
