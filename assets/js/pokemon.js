const url = new URL(window.location.href);

const searchParams = url.searchParams;

const pokemonName = searchParams.get("name");

if (pokemonName) {

  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

 
  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Erro na solicitação à API: ${response.status}`);
      }
    })
    .then((pokemonData) => {
  
      const pokemonDiv = document.getElementById("pokemon-info");

      const capitalizedPokemonName =
      pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
      
      const primeiroTipo = pokemonData.types[0] ? pokemonData.types[0].type.name : "";

    pokemonDiv.innerHTML = `
        <h1>${capitalizedPokemonName}</h1>
        <img class="${primeiroTipo}" style="border-radius: 6px;" src="${pokemonData.sprites.front_default}" alt="${capitalizedPokemonName}">
        <h2>Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</h2>
        <h2>Habilidades: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</h2>
        <h2>Estatísticas Principais:</h2>
        <ul>
          <li>HP: ${pokemonData.stats[0].base_stat}</li>
          <li>Ataque: ${pokemonData.stats[1].base_stat}</li>
          <li>Defesa: ${pokemonData.stats[2].base_stat}</li>
          <li>Ataque Especial: ${pokemonData.stats[3].base_stat}</li>
          <li>Defesa Especial: ${pokemonData.stats[4].base_stat}</li>
          <li>Velocidade: ${pokemonData.stats[5].base_stat}</li>
          <a href="index.html"><button>Voltar</button></a>
        </ul>
    `;
  })
} else {
  console.log("O parâmetro 'name' não foi encontrado na URL.");
  window.location.replace("index.html");
}
