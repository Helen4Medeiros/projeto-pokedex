app.component('favs-page', {
  props: {
    favoritesList: Array,
    shinyMode:     Boolean,
    favorites:     Array,
  },
  emits: ['go-home', 'open-detail', 'toggle-favorite'],
  computed: {
    isEmpty() { return !this.favoritesList || this.favoritesList.length === 0; },
  },
  template: `
    <div class="favs-page">

      <div class="favs-topbar">
        <button class="detail-back-btn" @click="$emit('go-home')">
          <span class="detail-back-arrow">←</span>
          Voltar à Pokédex
        </button>
        <span class="favs-topbar-title">Favoritos</span>
        <span class="favs-topbar-count" v-if="!isEmpty">{{ favoritesList.length }} Pokémon</span>
      </div>

      <div class="favs-hero">
        <svg class="favs-hero-bg-pokeball" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M4.75 88 A96 96 0 0 1 195.25 88 Z" fill="rgba(255, 205, 5, 0.07)"/>
          <rect x="4" y="88" width="192" height="24" fill="rgb(48, 38, 2)" stroke="rgb(48, 38, 2)"/>
          <circle cx="100" cy="100" r="96" fill="rgba(255, 255, 255, 0)" stroke="rgba(97, 78, 4, 0.5)" stroke-width="3"/>
          <circle cx="100" cy="100" r="28" fill="rgb(48, 38, 2)" stroke="rgba(48, 38, 2, 0.5)" stroke-width="3"/>
          <circle cx="100" cy="100" r="18" fill="rgb(8, 8, 15)" stroke="rgb(8, 8, 15)" stroke-width="2"/>
          <circle cx="76" cy="56" r="10" fill="rgba(97, 78, 4, 0.5)"/>
        </svg>
        <div class="favs-hero-inner">
          <div class="favs-hero-icon">★</div>
          <div class="favs-hero-title">SEUS FAVORITOS</div>
          <div class="favs-hero-sub">Pokémon que você marcou como favorito</div>
        </div>
      </div>

      <div class="page-wrap" v-if="!isEmpty">
        <div class="grid">
          <pokemon-card
            v-for="(pokemon, index) in favoritesList"
            :key="pokemon.id"
            :pokemon="pokemon"
            :index="index"
            :is-favorite="favorites.includes(pokemon.id)"
            :shiny-mode="shinyMode"
            @open-detail="$emit('open-detail', $event)"
            @toggle-favorite="$emit('toggle-favorite', $event)"
          ></pokemon-card>
        </div>
      </div>

      <div class="favs-empty" v-else>
        <div class="favs-empty-icon">☆</div>
        <div class="favs-empty-title">Nenhum favorito ainda</div>
        <div class="favs-empty-sub">Clique na estrela ★ em qualquer card para adicionar aqui.</div>
        <button class="favs-back-btn" @click="$emit('go-home')">Explorar Pokédex</button>
      </div>

      <app-footer></app-footer>
    </div>
  `,
});