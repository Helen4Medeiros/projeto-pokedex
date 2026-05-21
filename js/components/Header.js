app.component('app-header', {
  props: {
    filteredCount: Number,
    totalCount:    Number,
    loading:       Boolean,
    loadProgress:  Number,
    typeFilter:    String,
  },
  emits: ['update:type-filter'],
  data() {
    return {
      totalTarget: TOTAL_POKEMON,
      allTypes: Object.keys(TYPE_COLORS),
    };
  },
  methods: {
    typeBtnStyle(type) {
      const c = TYPE_COLORS[type] || '#888';
      const active = this.typeFilter === type;
      return active
        ? { background: c, color: '#fff', border: `2px solid ${c}`, boxShadow: `0 0 20px ${c}99` }
        : { background: `${c}18`, color: c, border: `2px solid ${c}40` };
    },
    typeLabel(t) { return TYPE_PT[t] || t; },
    toggleType(type) {
      this.$emit('update:type-filter', this.typeFilter === type ? '' : type);
    },
  },
  template: `
    <div class="site-header">

      <svg class="header-bg-pokeball" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 100 A96 96 0 0 1 196 100 Z" fill="rgba(26, 26, 49, 0.3)"/>
        <rect x="4" y="88" width="192" height="24" fill="rgb(19, 19, 36)" stroke="rgb(19, 19, 36)"/>
        <circle cx="100" cy="100" r="96" fill="rgba(255, 255, 255, 0)" stroke="rgba(26, 26, 49, 0.68)" stroke-width="3"/>
        <circle cx="100" cy="100" r="28" fill="rgb(19, 19, 36)" stroke="rgba(19, 19, 36, 0.68)" stroke-width="3"/>
        <circle cx="100" cy="100" r="18" fill="rgb(8, 8, 15)" stroke="rgb(8, 8, 15)" stroke-width="2"/>
        <circle cx="76" cy="56" r="10" fill="rgba(26, 26, 49, 0.68)"/>
      </svg>

      <div class="header-logo-wrap">
        <svg class="header-pokeball-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
          @click="() => location.reload()" title="Recarregar página" style="cursor:pointer">
          <circle cx="100" cy="100" r="96" fill="white" stroke="#222" stroke-width="4"/>
          <path d="M4 100 A96 96 0 0 1 196 100 Z" fill="#E3350D"/>
          <rect x="4" y="88" width="192" height="24" fill="#222"/>
          <circle cx="100" cy="100" r="28" fill="#222"/>
          <circle cx="100" cy="100" r="18" fill="white"/>
          <circle cx="76" cy="56" r="12" fill="rgba(255,255,255,0.3)"/>
        </svg>
      </div>

      <div class="header-eyebrow">Enciclopédia Pokémon</div>
      <div class="header-title">POKÉDEX <span class="accent">NACIONAL</span></div>
      <div class="header-subtitle">Todos os Pokémon · Todas as Gerações</div>

      <div class="header-count" v-if="totalCount > 0">
        Exibindo <b>{{ filteredCount }}</b> de <strong>{{ totalCount }}</strong> Pokémon
      </div>

      <div class="loading-wrap" v-if="loading">
        <div class="loader-ring"></div>
        <div class="loading-text">Carregando dados da Pokédex...</div>
        <div class="loading-bar-wrap">
          <div class="loading-bar" :style="{ width: loadProgress + '%' }"></div>
        </div>
        <div class="load-progress">{{ totalCount }} / {{ totalTarget }}</div>
      </div>

      <div class="header-type-strip" v-if="!loading && totalCount > 0">
        <button
          v-for="type in allTypes" :key="type"
          class="type-filter-btn"
          :class="{ active: typeFilter === type }"
          :style="typeBtnStyle(type)"
          @click="toggleType(type)"
        >{{ typeLabel(type) }}</button>
      </div>

      <div class="header-type-hint" v-if="!loading && totalCount > 0">
        {{ typeFilter ? 'Clique novamente para remover o filtro.' : 'Clique em um para começar sua jornada!' }}
      </div>
      
    </div>
  `,
});
