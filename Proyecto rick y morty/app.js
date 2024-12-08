const API_URL = "https://rickandmortyapi.com/api/character";

// Selectores
const charactersContainer = document.getElementById("characters");
const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("statusFilter");
const genderFilter = document.getElementById("genderFilter");
const clearFilters = document.getElementById("clearFilters");

// Función para obtener los personajes
async function fetchCharacters(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayCharacters(data.results);
}

// Función para mostrar los personajes
function displayCharacters(characters) {
  charactersContainer.innerHTML = "";
  characters.forEach(character => {
    const card = document.createElement("div");
    card.className = "col-md-3";
    card.innerHTML = `
      <div class="card h-100">
        <img src="${character.image}" alt="${character.name}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text">Status: ${character.status}</p>
          <p class="card-text">Gender: ${character.gender}</p>
        </div>
      </div>
    `;
    charactersContainer.appendChild(card);
  });
}

// Función para aplicar filtros
function applyFilters() {
  const name = searchInput.value.toLowerCase();
  const status = statusFilter.value;
  const gender = genderFilter.value;

  let url = `${API_URL}?name=${name}`;
  if (status) url += `&status=${status}`;
  if (gender) url += `&gender=${gender}`;

  fetchCharacters(url);
}

// Eventos
searchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);
genderFilter.addEventListener("change", applyFilters);
clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  statusFilter.value = "";
  genderFilter.value = "";
  fetchCharacters(API_URL);
});

// Inicializar
fetchCharacters(API_URL);