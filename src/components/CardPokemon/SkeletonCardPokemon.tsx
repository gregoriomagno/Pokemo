import React from 'react'
import Skeleton from 'react-loading-skeleton';

const SkeletonCardPokemon = () => {
    return (
      <div className="max-w-xs bg-white p-4 rounded-lg shadow-md">
        {/* Imagem de esqueleto */}
        <Skeleton height={200} width={200} style={{ marginBottom: '1rem' }} />
  
        {/* Sobreposição escura de esqueleto */}
        <div className="bg-black opacity-20 h-40 rounded-t-lg mb-4"></div>
  
        {/* Botão de ação de esqueleto */}
        <div className="flex items-center justify-center">
          <Skeleton width={80} height={30} />
        </div>
  
        {/* Descrição de esqueleto */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">
            <Skeleton />
          </h2>
          <p className="text-gray-700">
            <Skeleton count={3} />
          </p>
        </div>
      </div>
    );
  };
  
  export default SkeletonCardPokemon;
