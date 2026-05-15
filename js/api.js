// POKEAPI 

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetches the full list of pokemon (name + url).
 * @param {number} limit
 * @returns {Promise<Array>}
 */
async function fetchPokemonList(limit = TOTAL_POKEMON) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error('Falha ao buscar lista de Pokémon');
  const data = await res.json();
  return data.results;
}

/**
 * Fetches full pokemon data by URL or ID/name.
 * @param {string} urlOrId
 * @returns {Promise<Object>}
 */
async function fetchPokemon(urlOrId) {
  const url = typeof urlOrId === 'string' && urlOrId.startsWith('http')
    ? urlOrId
    : `${BASE_URL}/pokemon/${urlOrId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Falha ao buscar Pokémon: ${urlOrId}`);
  return res.json();
}

/**
 * Fetches pokemon species data (flavor text, evolution chain url, etc.)
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
async function fetchSpecies(id) {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  if (!res.ok) throw new Error(`Falha ao buscar espécie: ${id}`);
  return res.json();
}

/**
 * Fetches evolution chain data.
 * @param {string} url  - full URL from species.evolution_chain.url
 * @returns {Promise<Object>}
 */
async function fetchEvolutionChain(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Falha ao buscar cadeia de evolução');
  return res.json();
}

/**
 * Resolves a flat array of { name, level } from the evolution chain.
 * @param {Object} chain  - evoData.chain
 * @returns {Array}
 */
function flattenEvolutionChain(chain) {
  const result = [];
  let cur = chain;
  while (cur) {
    result.push({
      name:  cur.species.name,
      level: cur.evolves_to[0]?.evolution_details[0]?.min_level ?? null,
    });
    cur = cur.evolves_to[0] ?? null;
  }
  return result;
}

/**
 * Returns the sprite URL for a pokemon.
 * @param {Object} pokemon
 * @param {boolean} shiny
 * @returns {string}
 */
function getSprite(pokemon, shiny = false) {
  if (shiny) {
    return (
      pokemon.sprites?.other?.['official-artwork']?.front_shiny ||
      pokemon.sprites?.front_shiny ||
      pokemon.sprites?.other?.['official-artwork']?.front_default ||
      pokemon.sprites?.front_default ||
      ''
    );
  }
  return (
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    ''
  );
}

/**
 * Returns a zero-padded Pokédex number string.
 * @param {number} id
 * @param {number} digits
 * @returns {string}
 */
function padId(id, digits = 4) {
  return String(id).padStart(digits, '0');
}

/**
 * Returns the primary type color for a pokemon.
 * @param {Object} pokemon
 * @returns {string}
 */
function primaryColor(pokemon) {
  const t = pokemon.types?.[0]?.type?.name;
  return TYPE_COLORS[t] || '#888';
}

/**
 * Returns the stat base value for a given stat name.
 * @param {Object} pokemon
 * @param {string} statName  e.g. 'hp', 'attack'
 * @returns {number}
 */
function getStat(pokemon, statName) {
  return pokemon.stats?.find(s => s.stat.name === statName)?.base_stat ?? 0;
}
