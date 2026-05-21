app.component('app-footer', {
  template: `
    <footer class="site-footer">
      <div class="footer-inner">

        
        <div class="footer-brand">
          <svg class="footer-pokeball" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="white" stroke="#333" stroke-width="3"/>
            <path d="M2 50 A48 48 0 0 1 98 50 Z" fill="#E3350D"/>
            <rect x="2" y="44" width="96" height="12" fill="#222"/>
            <circle cx="50" cy="50" r="15" fill="#222"/>
            <circle cx="50" cy="50" r="10" fill="white"/>
          </svg>
          <div>
            <div class="footer-brand-name">Pokédex Nacional</div>
            <div class="footer-brand-sub">Enciclopédia Pokémon Completa</div>
          </div>
        </div>

        
        <div class="footer-info">
          <div class="footer-info-line">
            Dados fornecidos por
            <a href="https://pokeapi.co" target="_blank" rel="noopener" class="footer-link">PokéAPI</a>
          </div>
          <div class="footer-info-line">
            Pokémon &amp; nomes são marcas registradas da
            <span class="footer-highlight">Nintendo / Game Freak / Creatures Inc.</span>
          </div>
          <div class="footer-info-line footer-disclaimer">
            Este é um projeto FAN-MADE sem fins lucrativos.
          </div>
        </div>

        
        <div class="footer-gens">
          <div class="footer-gen-title">Gerações</div>
          <div class="footer-gen-list">
            <span class="footer-gen-badge">Kanto</span>
            <span class="footer-gen-badge">Johto</span>
            <span class="footer-gen-badge">Hoenn</span>
            <span class="footer-gen-badge">Sinnoh</span>
            <span class="footer-gen-badge">Unova</span>
            <span class="footer-gen-badge">Kalos</span>
            <span class="footer-gen-badge">Alola</span>
            <span class="footer-gen-badge">Galar</span>
            <span class="footer-gen-badge">Paldea</span>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <span>Pokédex Nacional · 898 Pokémon · Feito por Maria Helena CM</span>
      </div>
    </footer>
  `,
});