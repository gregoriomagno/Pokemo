export function verifyIfreplacementFair(array1 : any[], array2: any[], marginOfError = 20) {
    const sumExpArray1 = array1.reduce((acc, pokemon) => acc + (pokemon.base_experience || 0), 0);
    const sumExpArray2 = array2.reduce((acc, pokemon) => acc + (pokemon.base_experience || 0), 0);
  
    const difference = Math.abs(sumExpArray1 - sumExpArray2);
  
    console.log('verifyIfreplacementFair: ', difference)
    return difference <= marginOfError;
  }

  export function filterPokemonsBySearch(pokemonList: any[], searchValue: string) {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }