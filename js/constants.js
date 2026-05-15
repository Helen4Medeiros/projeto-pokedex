// cores-tipagens
const TYPE_COLORS = {
  normal:   '#A8A878',
  fire:     '#F08030',
  water:    '#6890F0',
  electric: '#F8D030',
  grass:    '#78C850',
  ice:      '#98D8D8',
  fighting: '#C03028',
  poison:   '#A040A0',
  ground:   '#E0C068',
  flying:   '#A890F0',
  psychic:  '#F85888',
  bug:      '#A8B820',
  rock:     '#B8A038',
  ghost:    '#705898',
  dragon:   '#7038F8',
  dark:     '#705848',
  steel:    '#B8B8D0',
  fairy:    '#EE99AC',
};

// traducao-tipagens
const TYPE_PT = {
  normal:   'Normal',
  fire:     'Fogo',
  water:    'Água',
  electric: 'Elétrico',
  grass:    'Grama',
  ice:      'Gelo',
  fighting: 'Lutador',
  poison:   'Veneno',
  ground:   'Terra',
  flying:   'Voador',
  psychic:  'Psíquico',
  bug:      'Inseto',
  rock:     'Pedra',
  ghost:    'Fantasma',
  dragon:   'Dragão',
  dark:     'Sombrio',
  steel:    'Aço',
  fairy:    'Fada',
};

// cores-status
const STAT_COLORS = {
  hp:               '#FF5959',
  attack:           '#F5AC78',
  defense:          '#FAE078',
  'special-attack': '#9DB7F5',
  'special-defense':'#A7DB8D',
  speed:            '#FA92B2',
};

// traducao-status
const STAT_PT = {
  hp:               'HP',
  attack:           'Ataque',
  defense:          'Defesa',
  'special-attack': 'Sp. Atk',
  'special-defense':'Sp. Def',
  speed:            'Velocidade',
};

// range-geracao
const GEN_RANGES = [
  null,          // index 0 = "Todos"
  [1,   151],    // Gen I
  [152, 251],    // Gen II
  [252, 386],    // Gen III
  [387, 493],    // Gen IV
  [494, 649],    // Gen V
  [650, 721],    // Gen VI
  [722, 809],    // Gen VII
  [810, 898],    // Gen VIII
];

// total de pokemon
const TOTAL_POKEMON = 898;

// tamanho-chunk
const CHUNK_SIZE = 40;
