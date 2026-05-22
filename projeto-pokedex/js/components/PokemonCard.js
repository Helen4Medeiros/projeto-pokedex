app.component('pokemon-card', {
  props: {
    pokemon:    Object,
    index:      Number,
    isFavorite: Boolean,
    shinyMode:  Boolean,
  },
  emits: ['open-detail', 'toggle-favorite'],
  computed: {
    types()        { return this.pokemon.types.map(t => t.type.name); },
    primaryColor() { return TYPE_COLORS[this.types[0]] || '#888'; },
    sprite()       { return getSprite(this.pokemon, this.shinyMode); },
    number()       { return '#' + padId(this.pokemon.id, 4); },
    animDelay()    { return Math.min(this.index * 0.018, 0.5) + 's'; },
  },
  methods: {
    badgeStyle(type) {
      const c = TYPE_COLORS[type] || '#888';
      return { background: `${c}22`, color: c, border: `1px solid ${c}55` };
    },
    typeLabel(type) { return TYPE_PT[type] || type; },
  },
  template: `
    <div
      class="pokemon-card"
      :style="{ animationDelay: animDelay, '--card-color': primaryColor }"
      @click="$emit('open-detail', pokemon.id)"
    >

      <div class="card-color-bar" :style="{ background: primaryColor }"></div>

      <button class="fav-btn" :class="{ active: isFavorite }"
        @click.stop="$emit('toggle-favorite', pokemon.id)" title="Favorito">★</button>

      <div class="card-num">{{ number }}</div>

      <img class="card-img" :src="sprite" :alt="pokemon.name" loading="lazy" />

      <div class="card-name">{{ pokemon.name }}</div>

      <div class="card-types">
        <span v-for="type in types" :key="type"
          class="type-badge" :style="badgeStyle(type)">{{ typeLabel(type) }}</span>
      </div>
    </div>
  `,
});
