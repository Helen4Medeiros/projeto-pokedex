const TYPE_COLORS = {
  normal:'#A8A878',fire:'#F08030',water:'#6890F0',electric:'#F8D030',
  grass:'#78C850',ice:'#98D8D8',fighting:'#C03028',poison:'#A040A0',
  ground:'#E0C068',flying:'#A890F0',psychic:'#F85888',bug:'#A8B820',
  rock:'#B8A038',ghost:'#705898',dragon:'#7038F8',dark:'#705848',
  steel:'#B8B8D0',fairy:'#EE99AC',
};

const TYPE_PT = {
  normal:'Normal',fire:'Fogo',water:'Água',electric:'Elétrico',
  grass:'Grama',ice:'Gelo',fighting:'Lutador',poison:'Veneno',
  ground:'Terra',flying:'Voador',psychic:'Psíquico',bug:'Inseto',
  rock:'Pedra',ghost:'Fantasma',dragon:'Dragão',dark:'Sombrio',
  steel:'Aço',fairy:'Fada',
};

const STAT_COLORS = {
  hp:'#FF5959',attack:'#F5AC78',defense:'#FAE078',
  'special-attack':'#9DB7F5','special-defense':'#A7DB8D',speed:'#FA92B2',
};

const STAT_PT = {
  hp:'HP',attack:'Ataque',defense:'Defesa',
  'special-attack':'Sp. Atk','special-defense':'Sp. Def',speed:'Velocidade',
};

const GEN_RANGES = [
  null,            // 0 = Todos
  [1,   151],      // I   — Kanto
  [152, 251],      // II  — Johto
  [252, 386],      // III — Hoenn
  [387, 493],      // IV  — Sinnoh
  [494, 649],      // V   — Unova
  [650, 721],      // VI  — Kalos
  [722, 809],      // VII — Alola
  [810, 905],      // VIII— Galar / Hisui
  [906, 1025],     // IX  — Paldea
];

const TOTAL_POKEMON = 1025;

const CHUNK_SIZE = 50;

const HABITAT_PT = {
  cave:        'Caverna',
  forest:      'Floresta',
  'grassland': 'Campo',
  mountain:    'Montanha',
  rare:        'Raro',
  'rough-terrain': 'Terreno Acidentado',
  sea:         'Mar',
  urban:       'Urbano',
  'waters-edge': 'Beira d\'Água',
  '—':         '—',
};

const GEN_PT = {
  I:'I — Kanto', II:'II — Johto', III:'III — Hoenn',
  IV:'IV — Sinnoh', V:'V — Unova', VI:'VI — Kalos',
  VII:'VII — Alola', VIII:'VIII — Galar/Hisui', IX:'IX — Paldea',
};
