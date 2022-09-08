// async / await
async function fetchPokemon(pokemonName) {
  const formattedPokemonName = pokemonName.toLowerCase().trim()

  const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedPokemonName}`)
    .then(res => res.json())
    .catch(err => {
      alert(`Sorry, we couldn't find a pokemon with that name!`)
      console.error(err)
    })

  const cardEls = document.querySelectorAll('.card')

  cardEls.forEach(cardEl => {
    const cardTitle = cardEl.querySelector('.card-title')
    cardTitle.textContent = _.startCase(pokemonData.name)

    const cardImg = cardEl.querySelector('.card-img')
    cardImg.setAttribute('src', pokemonData.sprites.front_default)

    const cardType = cardEl.querySelector('.card-type')
    cardType.textContent = pokemonData.types[0].type.name
  })
}

fetchPokemon('Pikachu')

const searchForm = document.querySelector('.pokemon-search')
searchForm.addEventListener('submit', event => {
  event.preventDefault()

  const searchInputEl = document.querySelector('.pokemon-search-input')
  
  const query = searchInputEl.value
  fetchPokemon(query)
  searchInputEl.value = ''
})