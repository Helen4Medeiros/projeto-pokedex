const { createApp, ref, computed, watch, onMounted, onUnmounted } = Vue;

const app = createApp({
  setup() {
    const allPokemon   = ref([]);
    const isLoading    = ref(true);
    const loadProgress = ref(0);

    const search     = ref('');
    const typeFilter = ref('');
    const sortBy     = ref('id');
    const currentGen = ref(0);
    const shinyMode  = ref(false);

    const favorites = ref(JSON.parse(localStorage.getItem('pokedex_favs') || '[]'));

    // 'inicio' | 'detalhe' | 'favs'
    const screen          = ref('home'); 
    const detailOpen      = computed(() => screen.value === 'detail');
    const favsOpen        = computed(() => screen.value === 'favs');
    const selectedPokemon = ref(null);

    const showScrollTop = ref(false);
    const toast = ref({ show: false, message: '', _timer: null });

    // filtragem
    const filteredList = computed(() => {
      let list = [...allPokemon.value];
      if (currentGen.value > 0) {
        const range = GEN_RANGES[currentGen.value];
        if (range) list = list.filter(p => p.id >= range[0] && p.id <= range[1]);
      }
      if (typeFilter.value) {
        list = list.filter(p => p.types.some(t => t.type.name === typeFilter.value));
      }
      const q = search.value.toLowerCase().trim();
      if (q) list = list.filter(p => p.name.includes(q) || String(p.id) === q || padId(p.id).includes(q));
      switch (sortBy.value) {
        case 'name':    list.sort((a,b) => a.name.localeCompare(b.name)); break;
        case 'hp':      list.sort((a,b) => getStat(b,'hp')      - getStat(a,'hp'));      break;
        case 'attack':  list.sort((a,b) => getStat(b,'attack')  - getStat(a,'attack'));  break;
        case 'defense': list.sort((a,b) => getStat(b,'defense') - getStat(a,'defense')); break;
        case 'speed':   list.sort((a,b) => getStat(b,'speed')   - getStat(a,'speed'));   break;
        default:        list.sort((a,b) => a.id - b.id);
      }
      return list;
    });

    // favoritos
    const favoritesList = computed(() => {
      return allPokemon.value
        .filter(p => favorites.value.includes(p.id))
        .sort((a,b) => favorites.value.indexOf(a.id) - favorites.value.indexOf(b.id));
    });

    watch(favorites, val => localStorage.setItem('pokedex_favs', JSON.stringify(val)), { deep: true });

    function toggleFavorite(id) {
      const idx = favorites.value.indexOf(id);
      if (idx === -1) { favorites.value.push(id);       showToast('★ Adicionado aos favoritos'); }
      else            { favorites.value.splice(idx, 1); showToast('Removido dos favoritos'); }
    }

    function openDetail(id) {
      const p = allPokemon.value.find(x => x.id === id);
      if (!p) return;
      selectedPokemon.value = p;
      screen.value = 'detail';
      window.scrollTo({ top: 0 });
    }

    function goHome() {
      screen.value = 'home';
      selectedPokemon.value = null;
      document.body.style.overflow = '';
    }

    function openFavs() { screen.value = 'favs'; window.scrollTo({ top: 0 }); }

    function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

    function showToast(message) {
      clearTimeout(toast.value._timer);
      toast.value.message = message;
      toast.value.show    = true;
      toast.value._timer  = setTimeout(() => { toast.value.show = false; }, 2200);
    }

    function handleScroll() { showScrollTop.value = window.scrollY > 400; }
    function handleKey(e)   { if (e.key === 'Escape') goHome(); }

    async function loadPokemon() {
      try {
        const list = await fetchPokemonList(TOTAL_POKEMON);
        for (let i = 0; i < list.length; i += CHUNK_SIZE) {
          const batch = await Promise.all(list.slice(i, i + CHUNK_SIZE).map(p => fetchPokemon(p.url)));
          allPokemon.value.push(...batch);
          allPokemon.value.sort((a,b) => a.id - b.id);
          loadProgress.value = Math.round(allPokemon.value.length / TOTAL_POKEMON * 100);
          if (isLoading.value && allPokemon.value.length >= CHUNK_SIZE) isLoading.value = false;
        }
      } catch (err) { console.error(err); }
      finally { isLoading.value = false; }
    }

    onMounted(() => {
      loadPokemon();
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('keydown', handleKey);
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKey);
    });

    return {
      allPokemon, filteredList, favoritesList,
      isLoading, loadProgress,
      search, typeFilter, sortBy, currentGen, shinyMode,
      favorites, screen, detailOpen, favsOpen, selectedPokemon,
      showScrollTop, toast,
      toggleFavorite, openDetail, goHome, openFavs, scrollToTop,
    };
  },
});
