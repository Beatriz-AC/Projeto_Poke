const grid = document.getElementById("grid");
const typeColors = {
  normal: "coloque uma cor aqui",
  fire: "coloque uma cor aqui",
  water: "coloque uma cor aqui",
  electric: "coloque uma cor aqui",
  grass: "coloque uma cor aqui",
  ice: "coloque uma cor aqui",
  fighting: "coloque uma cor aqui",
  poison: "coloque uma cor aqui",
  ground: "coloque uma cor aqui",
  flying: "coloque uma cor aqui",
  psychic: "coloque uma cor aqui",
  bug: "coloque uma cor aqui",
  rock: "coloque uma cor aqui",
  ghost: "coloque uma cor aqui",
  dragon: "coloque uma cor aqui",
  steel: "coloque uma cor aqui",
  fairy: "coloque uma cor aqui",
  dark: "coloque uma cor aqui",
};

// Lógica de Fetch e Criação
async function fetchAndCreateCard(pokemon) {
  try {
    //coloque aqui o código de fetch
    createCardHTML(data);
  } catch (error) {
    //trate o erro aqui
  }
}

function createCardHTML(data) {
  // Extração de dados
  const name = data.name;
  const id = data.id.toString().padStart(3, "0");
  const imgUrl =
    data.sprites.other["official-artwork"].front_default ||
    data.sprites.front_default;
  const height = data.height / 10; // m
  const weight = data.weight / 10; // kg
  const abilities = data.abilities
    .map((a) => a.ability.name)
    .slice(0, 2)
    .join(", ");

  // Stats
  const stats = {};
  data.stats.forEach((s) => (stats[s.stat.name] = s.base_stat));
  const atk = stats["attack"] || 0;
  const def = stats["defense"] || 0;

  // Cores
  const mainType = data.types[0].type.name;
  const color = typeColors[mainType] || "#777";

  // Gerar HTML dos tipos
  const typesHtml = data.types
    .map((t) => {
      const tName = t.type.name;
      const tColor = typeColors[tName] || "#777";
      return `<span class="type-badge" style="background-color: ${tColor}">${tName}</span>`;
    })
    .join("");

  // Criar Elemento Card
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  // Template String do HTML interno do Card
  card.innerHTML = `
                    <div class="card-header" style="background: linear-gradient(to bottom, ${color}, white);">
                    <img src="${imgUrl}" alt="${name}" class="poke-img">
                </div>
                <div class="card-body">
                    <span class="poke-id">#${id}</span>
                    <h2 class="poke-name">${name}</h2>
                    <div class="types">${typesHtml}</div>
                    
                    <div class="info-row">
                        <div class="info-box">
                            <h4>Altura</h4>
                            <p>${height} m</p>
                        </div>
                        <div class="info-box">
                            <h4>Peso</h4>
                            <p>${weight} kg</p>
                        </div>
                    </div>

                    <div class="abilities">
                        <strong>Habilidades:</strong> ${abilities}
                    </div>

                    <div class="stats-wrapper">
                        <div class="stat-line">
                            <span class="stat-label">ATK</span>
                            <span class="stat-value">${atk}</span>
                            <div class="progress-bg">
                                <div class="progress-fill" style="width: ${Math.min(
                                  atk / 2,
                                  100
                                )}%; background-color: ${color}"></div>
                            </div>
                        </div>
                        <div class="stat-line">
                            <span class="stat-label">DEF</span>
                            <span class="stat-value">${def}</span>
                            <div class="progress-bg">
                                <div class="progress-fill" style="width: ${Math.min(
                                  def / 2,
                                  100
                                )}%; background-color: ${color}"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

  // Adiciona ao início do Grid
  grid.prepend(card);
}

// Inicializar com alguns Pokémons
(async function init() {
  await fetchAndCreateCard("umbreon");
  
})();
