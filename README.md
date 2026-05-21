# 🇧🇷 Projeto-Pokedex - Pokédex Nacional

Uma Pokédex Nacional completa desenvolvida como projeto pessoal com foco em demonstrar habilidades de **Front-End**, organização de código e consumo de APIs utilizando apenas **HTML, CSS e JavaScript puro**.

O projeto foi inspirado na estrutura de frameworks modernos como o Vue.js, utilizando separação por componentes, renderização dinâmica e organização modular do código.

---

## Demonstração

> Adicione aqui o link do deploy do projeto (Vercel, Netlify ou GitHub Pages)

```bash
https://projeto-pokedex-jet.vercel.app/
```

---

## Funcionalidades

### Tela Inicial

- Listagem completa dos **1025 Pokémon** em cards
- Sistema de favoritos
- Filtros por:
  - Tipo
  - Geração
  - Ordem alfabética
  - Número da Pokédex
  - Maior ataque
  - Maior defesa
  - E outras ordenações gerais
- Modo **Shiny** com atualização dinâmica de todos os Pokémon
- Navegação fluida entre páginas

### Tela de Favoritos

- Exibe apenas os Pokémon favoritadas pelo usuário
- Persistência local dos favoritos
- Atualização dinâmica da interface

### Tela de Detalhes

- Informações detalhadas do Pokémon selecionado
- Exibição de estatísticas
- Imagens e dados carregados via API
- Interface inspirada na Pokédex clássica

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Consumo de API REST (PokeAPI)
- Organização modular baseada em componentes

---

## Conceitos Aplicados

Este projeto foi desenvolvido com foco em aplicar conceitos importantes do desenvolvimento Front-End moderno, como:

- Componentização
- Manipulação do DOM
- Organização em módulos JavaScript
- Consumo assíncrono de APIs
- Responsividade
- Separação de responsabilidades
- Estrutura semelhante a frameworks SPA
- Gerenciamento de estado simples no Front-End
- Persistência local utilizando LocalStorage

---

## Objetivo do Projeto

O principal objetivo deste projeto foi:

- Demonstrar domínio em desenvolvimento Front-End sem frameworks
- Simular arquiteturas modernas utilizando JavaScript puro
- Praticar componentização e organização escalável de código
- Trabalhar com consumo de APIs e renderização dinâmica
- Criar uma interface visualmente atrativa e funcional

---

## Responsividade

O projeto possui adaptação para diferentes tamanhos de tela, proporcionando uma experiência agradável tanto em desktop quanto em dispositivos móveis.

---

## Estrutura do Projeto

```bash
p-pokedex/
│
├── css/
│   ├── animations.css
│   ├── components.css
│   ├── detail.css
│   ├── layout.css
│   ├── reset.css
│   ├── responsive.css
│   └── variables.css
│
├── js/
│   ├── components/
│   │   ├── FavsPage.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── NavBar.js
│   │   ├── PokemonCard.js
│   │   └── PokemonDetail.js
│   │
│   ├── api.js
│   ├── app.js
│   ├── constants.js
│   └── mount.js
│
└── index.html
```

---

## Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/p-pokedex.git
```

### 2. Acesse a pasta do projeto

```bash
cd p-pokedex
```

### 3. Execute o projeto

Basta abrir o arquivo `index.html` no navegador.

Ou utilize uma extensão como:

- Live Server (VSCode)

---

## Autora

Desenvolvido por **Maria Helena CM**, estudante de **INFOWEB 3** no IFRN CNAT.

Feedbacks e ideias sobre o projeto, fique à vontade para entrar em contato:
<div> 
  <a href = "mailto:helenamaria241207@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>
</div>


---

## Licença

Este projeto foi desenvolvido para fins de estudo, prática e portfólio.

