app.component('app-navbar', {
  props: {
    search:     String,
    sortBy:     String,
    currentGen: Number,
    shinyMode:  Boolean,
    favsOpen:   Boolean,
    screen:     String,
  },
  emits: ['update:search','update:sort-by','update:current-gen','toggle-shiny','open-favs'],
  template: `
    <nav class="navbar">
      <div class="navbar-inner">
        <div class="nav-controls">

          <div class="nav-search-wrap">
            <span class="nav-search-icon">🔍</span>
            <input class="nav-search" type="text" placeholder="Nome ou número..."
              :value="search" @input="$emit('update:search', $event.target.value)"/>
          </div>

          <div class="nav-divider"></div>

          <div class="nav-select-wrap">
            <select class="nav-select" :value="currentGen"
              @change="$emit('update:current-gen', parseInt($event.target.value))">
              <option value="0">Todas as gerações</option>
              <option value="1">Geração I — Kanto</option>
              <option value="2">Geração II — Johto</option>
              <option value="3">Geração III — Hoenn</option>
              <option value="4">Geração IV — Sinnoh</option>
              <option value="5">Geração V — Unova</option>
              <option value="6">Geração VI — Kalos</option>
              <option value="7">Geração VII — Alola</option>
              <option value="8">Geração VIII — Galar/Hisui</option>
              <option value="9">Geração IX — Paldea</option>
            </select>
          </div>

          <div class="nav-select-wrap">
            <select class="nav-select" :value="sortBy"
              @change="$emit('update:sort-by', $event.target.value)">
              <option value="id">Nº Pokédex</option>
              <option value="name">A → Z</option>
              <option value="hp">Maior HP</option>
              <option value="attack">Maior Ataque</option>
              <option value="defense">Maior Defesa</option>
              <option value="speed">Mais Veloz</option>
            </select>
          </div>

          <div class="nav-divider"></div>

          <button class="nav-toggle" :class="{ 'fav-on': favsOpen }"
            @click="$emit('open-favs')" title="Favoritos">
            <span class="nav-toggle-icon">★</span>Favoritos
          </button>

          <button class="nav-toggle" :class="{ 'shiny-on': shinyMode }"
            @click="$emit('toggle-shiny')" title="Modo Shiny">
            <span class="nav-toggle-icon">✦</span>Shiny
          </button>

        </div>
      </div>
    </nav>
  `,
});
