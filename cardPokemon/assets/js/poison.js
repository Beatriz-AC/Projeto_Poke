const grid = document.getElementById("grid");

// Cores dos Tipos (Foco na cor Dark)
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

    if (!response.ok) {
      throw new Error(`Erro ao buscar ${pokemonNameOrId}: ${response.status}`);
    }

    const data = await response.json();
    createCardHTML(data);
  } catch (error) {
    console.error("Houve um erro no fetch:", error);
  }
}

function createCardHTML(data) {
   const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const id = data.id.toString().padStart(3, "0");
  const imgUrl =
    data.sprites.other["official-artwork"].front_default ||
    data.sprites.front_default;
  const height = data.height / 10;
  const weight = data.weight / 10; 
  const abilities = data.abilities
    .map((a) => a.ability.name.replace(/-/g, " "))
    .slice(0, 2)
    .join(", ");

  const stats = {};
  data.stats.forEach((s) => (stats[s.stat.name] = s.base_stat));
  const atk = stats["attack"] || 0;
  const def = stats["defense"] || 0;


  const mainType = data.types[0].type.name;
  const color = typeColors[mainType] || "#595959ff";

 
  const card = document.createElement("div");
card.classList.add("pokemon-card");

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

  grid.appendChild(card);
}


const poisonPokemonList = [
"spectrier",
  "banette",
  "ceruledge",
  "jellicent",
  "annihilape",
  "typhlosion-hisui",
  "litwick",
  "bramblin",
  "drifblim",
  "dragapult",
  "chandelure",
  "palossand"
];


(async function init() {
    for (const pokemon of poisonPokemonList) {
        await fetchAndCreateCard(pokemon);
    }
})(); 