import React from "react";
import Image from "next/image";
interface CardProps {
  imageUrl: string;
  name: string;
  description: string;
  onClickButtonToReceive?: () => void;
  onClickButtonToReplace?: () => void;
  onClickButtonToRemove?: () => void;
  isSmallVersion?: boolean;
  showButtonRemove?: boolean
}
const CardPokemon = ({
  imageUrl,
  name,
  description,
  isSmallVersion,
  onClickButtonToReceive,
  onClickButtonToReplace,
  onClickButtonToRemove,
  showButtonRemove = true,
}: CardProps) => {
  return (
    <div
      className={`relative max-w-xs bg-white   rounded-lg shadow-md overflow-hidden group ${
        isSmallVersion ? "max-h-40" : "max-h-50" // Ajuste aqui para tornar a versão grande um pouco menor
      }`}
    >
      <Image
        src={imageUrl}
        alt={name}
        width={120}
        height={120}
        className={`w-full object-cover rounded-t-lg transition-opacity group-hover:opacity-75 ${
          isSmallVersion ? "h-24" : "max-h-full"
        }`}
      />

      <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-50"></div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 space-y-2">
        <div className="flex flex-col gap-2">
          {!!onClickButtonToReceive && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={onClickButtonToReceive}
            >
              Receber
            </button>
          )}
          {!!onClickButtonToReplace && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={onClickButtonToReplace}
            >
              Trocar
            </button>
          )}
        </div>

        {onClickButtonToRemove&& showButtonRemove && (
          <button
            className="bg-red-500 text-white px-2 py-2 rounded flex items-center"
            onClick={onClickButtonToRemove}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Remover
          </button>
        )}
      </div>

      <div className={`px-4 py-2 ${isSmallVersion ? "text-sm" : ""}`}>
        <h2
          className={`text-xl font-bold mb-2 ${
            isSmallVersion ? "text-base" : ""
          }`}
        >
          {name}
        </h2>
        <p className={`text-gray-700 ${isSmallVersion ? "text-xs" : ""}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardPokemon;
