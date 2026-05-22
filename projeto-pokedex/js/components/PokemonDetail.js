app.component('pokemon-detail', {
  props: {
    pokemon:    Object,
    shinyMode:  Boolean,
    isFavorite: Boolean,
  },
  emits: ['close','toggle-favorite','navigate'],
  data() {
    return { activeTab:'stats', evoLoading:false, evoChain:[], flavorLoading:false, flavorData:null };
  },
  computed: {
    types()        { return this.pokemon.types.map(t => t.type.name); },
    primaryColor() { return TYPE_COLORS[this.types[0]] || '#888'; },
    secondColor()  { return TYPE_COLORS[this.types[1]] || this.primaryColor; },
    sprite()       { return getSprite(this.pokemon, this.shinyMode); },
    number()       { return '#' + padId(this.pokemon.id, 4); },
    totalStats()   { return this.pokemon.stats.reduce((s,x) => s + x.base_stat, 0); },
    heroGradient() {
      const c1 = this.primaryColor;
      const c2 = this.secondColor;
      return `linear-gradient(135deg, ${c1}28 0%, ${c2}10 40%, transparent 70%)`;
    },
    heroGradientVar() { return this.heroGradient; },
  },
  watch: {
    pokemon: {
      immediate: true,
      handler() {
        this.activeTab = 'stats';
        this.evoChain = []; this.flavorData = null;
        document.body.style.overflow = 'hidden';
      },
    },
  },
  unmounted() { document.body.style.overflow = ''; },
  methods: {
    close() { document.body.style.overflow = ''; this.$emit('close'); },
    switchTab(tab) {
      this.activeTab = tab;
      if (tab === 'evo'    && !this.evoChain.length) this.loadEvo();
      if (tab === 'flavor' && !this.flavorData)      this.loadFlavor();
    },
    badgeStyle(type) {
      const c = TYPE_COLORS[type] || '#888';
      return { background: `${c}28`, color: c, border: `1.5px solid ${c}55` };
    },
    typeLabel(t)  { return TYPE_PT[t] || t; },
    statColor(n)  { return STAT_COLORS[n] || '#aaa'; },
    statLabel(n)  { return STAT_PT[n] || n; },
    statWidth(v)  { return Math.min(v, 255) / 255 * 100 + '%'; },

    async loadEvo() {
      this.evoLoading = true;
      try {
        const sp  = await fetchSpecies(this.pokemon.id);
        const ed  = await fetchEvolutionChain(sp.evolution_chain.url);
        const flat = flattenEvolutionChain(ed.chain);
        this.evoChain = await Promise.all(flat.map(async e => {
          const p = await fetchPokemon(e.name);
          return { id:p.id, name:p.name, img:getSprite(p, this.shinyMode), level:e.level };
        }));
      } catch(e) { console.error(e); this.evoChain = []; }
      finally { this.evoLoading = false; }
    },

    async loadFlavor() {
      this.flavorLoading = true;
      try {
        const s = await fetchSpecies(this.pokemon.id);
        let entries = s.flavor_text_entries.filter(e => e.language.name === 'pt-BR');
        if (!entries.length) entries = s.flavor_text_entries.filter(e => e.language.name === 'en');
        const entry = entries[Math.floor(Math.random() * Math.min(entries.length, 6))];

        let genus = s.genera?.find(g => g.language.name === 'pt-BR')?.genus
                 || s.genera?.find(g => g.language.name === 'en')?.genus
                 || '';
        
        const habitatRaw = s.habitat?.name || '—';
        const habitatPT  = HABITAT_PT[habitatRaw] || habitatRaw.replace(/-/g,' ');
        
        const genRaw = s.generation?.name?.replace('generation-','').toUpperCase() || '—';
        const genLabel = GEN_PT[genRaw] || genRaw;

        this.flavorData = {
          text:        entry?.flavor_text?.replace(/[\f\n]/g,' ') || '—',
          genus,
          habitat:     habitatPT,
          generation:  genLabel,
          captureRate: s.capture_rate ?? '—',
          happiness:   s.base_happiness ?? '—',
        };
      } catch(e) { this.flavorData = {text:'—',genus:'',habitat:'—',generation:'—',captureRate:'—',happiness:'—'}; }
      finally { this.flavorLoading = false; }
    },

    navigateTo(id) { this.$emit('navigate', id); },
  },

  template: `
    <div class="detail-page">
      
      <div class="detail-topbar">
        <div class="detail-back-btn" @click="close">
          <span class="detail-back-arrow">←</span>
          Voltar
        </div>
        <span class="detail-topbar-name">{{ pokemon.name }}</span>
        <button class="detail-topbar-fav" :class="{ active: isFavorite }" @click="$emit('toggle-favorite', pokemon.id)">★</button>
      </div>

      <div class="detail-hero-band" :style="{ '--hero-gradient': heroGradient }">
      
        <svg class="detail-band-pokeball" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M4 100 A96 96 0 0 1 196 100 Z" fill="rgba(255, 255, 255, 0.04)"/>
          <rect x="4" y="88" width="192" height="24" fill="rgb(42, 40, 49)" stroke="rgb(42, 40, 49)"/>
          <circle cx="100" cy="100" r="96" fill="rgba(255, 255, 255, 0)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="3"/>
          <circle cx="100" cy="100" r="28" fill="rgb(42, 40, 49)" stroke="rgba(42, 40, 49, 0.5)" stroke-width="3"/>
          <circle cx="100" cy="100" r="18" fill="rgb(8, 8, 15)" stroke="rgb(8, 8, 15)" stroke-width="2"/>
          <circle cx="76" cy="56" r="10" fill="rgb(42, 40, 49)"/>
        </svg>

        <div class="detail-hero-inner">
          <!-- Sprite -->
          <div class="detail-sprite-col">
            <div class="detail-sprite-glow" :style="{ background: primaryColor }"></div>
            <img class="detail-sprite" :src="sprite" :alt="pokemon.name" />
          </div>

          <div class="detail-info-col">
            <div class="detail-num">{{ number }}</div>
            <div class="detail-name">{{ pokemon.name }}</div>

            <div class="detail-types-row">
              <span v-for="type in types" :key="type" class="type-badge-lg" :style="badgeStyle(type)">{{ typeLabel(type) }}</span>
            </div>

            <div class="detail-meta-pills">
              <div class="meta-pill">
                <span class="meta-pill-label">Altura</span>
                <div class="meta-pill-sep"></div>
                <span class="meta-pill-val">{{ (pokemon.height/10).toFixed(1) }} m</span>
              </div>
              <div class="meta-pill">
                <span class="meta-pill-label">Peso</span>
                <div class="meta-pill-sep"></div>
                <span class="meta-pill-val">{{ (pokemon.weight/10).toFixed(1) }} kg</span>
              </div>
              <div class="meta-pill">
                <span class="meta-pill-label">Exp. Base</span>
                <div class="meta-pill-sep"></div>
                <span class="meta-pill-val">{{ pokemon.base_experience || '—' }}</span>
              </div>
              <div class="meta-pill" style="border-color: rgba(255,203,5,0.2); background: rgba(255,203,5,0.06)">
                <span class="meta-pill-label">Total Stats</span>
                <div class="meta-pill-sep"></div>
                <span class="meta-pill-val" style="color: var(--yellow)">{{ totalStats }}</span>
              </div>
            </div>

            <div style="margin-top: 18px">
              <div class="ability-section-label">Habilidades</div>
              <div class="detail-abilities-row">
                <span
                  v-for="a in pokemon.abilities" :key="a.ability.name"
                  class="ability-chip"
                  :class="{ 'hidden-ab': a.is_hidden }"
                  :title="a.is_hidden ? 'Habilidade Oculta' : 'Habilidade'"
                >{{ a.ability.name.replace(/-/g,' ') }}{{ a.is_hidden ? ' ✦' : '' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-body">
        <div class="detail-tabs">
          <div v-for="tab in ['stats','evo','flavor']" :key="tab"
            class="detail-tab" :class="{ active: activeTab === tab }"
            @click="switchTab(tab)">
            {{ tab === 'stats' ? 'Estatísticas' : tab === 'evo' ? 'Evoluções' : 'Descrição' }}
          </div>
        </div>

        <div class="tab-panel" :class="{ active: activeTab === 'stats' }">
          <div class="stats-grid">
            <div class="stat-row" v-for="s in pokemon.stats" :key="s.stat.name">
              <div class="stat-label">{{ statLabel(s.stat.name) }}</div>
              <div class="stat-bar">
                <div class="stat-fill" :style="{ width: statWidth(s.base_stat), background: statColor(s.stat.name) }"></div>
              </div>
              <div class="stat-val">{{ s.base_stat }}</div>
            </div>
            <div class="stat-total-row">
              Total Geral <span class="stat-total-val">{{ totalStats }}</span>
            </div>
          </div>
        </div>

        <div class="tab-panel" :class="{ active: activeTab === 'evo' }">
          <div class="async-loading" v-if="evoLoading"><div class="mini-spinner"></div> Carregando evoluções...</div>
          <div v-else-if="!evoLoading && evoChain.length === 0" style="color:var(--text-muted);font-family:var(--font-ui);font-size:15px;padding:2rem 0">Sem dados de evolução disponíveis.</div>
          <div class="evo-chain" v-else>
            <template v-for="(evo, i) in evoChain" :key="evo.id">
              <div v-if="i > 0" class="evo-arrow-wrap">
                <div class="evo-arrow">→</div>
                <div class="evo-level">{{ evo.level ? 'Nv. ' + evo.level : 'Evolui' }}</div>
              </div>
              <div class="evo-item" :class="{ current: evo.id === pokemon.id }" @click="navigateTo(evo.id)">
                <img class="evo-img-lg" :src="evo.img" :alt="evo.name" />
                <div class="evo-name-lg">{{ evo.name }}</div>
                <div class="evo-num-lg">#{{ String(evo.id).padStart(4,'0') }}</div>
              </div>
            </template>
          </div>
        </div>

        <div class="tab-panel" :class="{ active: activeTab === 'flavor' }">
          <div class="async-loading" v-if="flavorLoading"><div class="mini-spinner"></div> Carregando...</div>
          <template v-else-if="flavorData">
            <div class="flavor-genus" v-if="flavorData.genus">{{ flavorData.genus }}</div>
            <div class="flavor-quote">{{ flavorData.text }}</div>
            <div class="flavor-grid">
              <div class="flavor-card"><div class="flavor-card-label">Habitat</div><div class="flavor-card-val">{{ flavorData.habitat }}</div></div>
              <div class="flavor-card"><div class="flavor-card-label">Geração</div><div class="flavor-card-val">{{ flavorData.generation }}</div></div>
              <div class="flavor-card"><div class="flavor-card-label">Taxa de Captura</div><div class="flavor-card-val">{{ flavorData.captureRate }}</div></div>
              <div class="flavor-card"><div class="flavor-card-label">Felicidade Base</div><div class="flavor-card-val">{{ flavorData.happiness }}</div></div>
            </div>
          </template>
        </div>
      </div>

      <app-footer></app-footer>
    </div>
  `,
});
