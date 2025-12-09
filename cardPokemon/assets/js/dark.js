//onde pega o HTML
const grid = document.getElementById("grid");

// Cores dos Tipos 
const typeColors = {
  normal: "#c6c5b7ff",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#675f72ff",
  dragon: "#6F35FC",
  steel: "#c2c2c2ff",
  fairy: "#df6aa4ff",
  dark: "#181717ff", 
};

// Lógica de Fetch
async function fetchAndCreateCard(pokemonNameOrId) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}/`;
    const response = await fetch(url);

    //verifica se deu certo
    if (!response.ok) {
      throw new Error(`Erro ao buscar ${pokemonNameOrId}: ${response.status}`);
    }

    //pega os dados em json
    const data = await response.json();
    //chama a função que cria o card
    createCardHTML(data);
    //se der erro
  } catch (error) {
    console.error("Houve um erro no fetch:", error);
  }
}
//função que cria o card
function createCardHTML(data) {
  //pega o nome e coloca a primeira letra maiuscula
   const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  //pega o id e coloca 0s na frente se precisar
  const id = data.id.toString().padStart(3, "0");
  //pega a imagem
  const imgUrl =
    data.sprites.other["official-artwork"].front_default ||
    data.sprites.front_default;
    //pega a altura em metros
  const height = data.height / 10;
  //pega o peso em kg
  const weight = data.weight / 10; 
  //pega as habilidades
  const abilities = data.abilities
    .map((a) => a.ability.name.replace(/-/g, " "))
    //pega só as duas primeiras
    .slice(0, 2)
    //junta em uma string
    .join(", ");
  //pega os status
  const stats = {};
  //coloca em um objeto
  data.stats.forEach((s) => (stats[s.stat.name] = s.base_stat));
  //pega ataque e defesa
  const atk = stats["attack"] || 0;
  const def = stats["defense"] || 0;

 //pega o tipo principal
  const mainType = data.types[0].type.name;
  //pega a cor do tipo
  const color = typeColors[mainType] || "#595959ff";

 //cria o card
  const card = document.createElement("div");
  //adiciona a classe
  card.classList.add("pokemon-card");
 //adiciona o HTML do card
  card.innerHTML = `
                <div class="card-header" style="background-color: ${color};">
                  <img src="${imgUrl}" alt="${name}" class="poke-img">
                </div>
                <div class="card-body">
                    <h2 class="poke-name">${name}</h2>
                    <div class="info-row">
                        <div class="info-box">
                            <h4>Peso</h4>
                            <p>${weight} kg</p>
                        </div>
                        <div class="info-box">
                            <h4>Força (ATK)</h4>
                            <p>${atk}</p>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-box">
                            <h4>Altura</h4>
                            <p>${height} m</p>
                        </div>
                        <div class="info-box">
                            <h4>Defesa (DEF)</h4>
                            <p>${def}</p>
                        </div>
                    </div>

                    <div class="abilities">
                        <strong>Habilidades:</strong> ${abilities}
                    </div>
                </div>
            `;
  //adiciona o card ao grid
  grid.appendChild(card);
}

//lista de pokemons dark
const darkPokemonList = [
    "tyranitar", 
    "greninja", 
    "sharpedo", 
    "nuzleaf", 
    "poochyena",
    "zorua",
    "morpeko-hangry", 
    "drapion", 
    "darkrai", 
    "umbreon", 
    "houndoom", 
    "yveltal"
];

//inicia o fetch e criação dos cards
(async function init() {
    for (const pokemon of darkPokemonList) {
        await fetchAndCreateCard(pokemon);
    }
})();