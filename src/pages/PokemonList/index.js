import './style.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import PokemonLine from '../../components/PokemonLine'
import Pages from '../../components/Pages';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';

export default function PokemonList() {

  const [pokemons, setPokemons] = useState([])
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [selectedPage, setSelectedPage] = useState(1)
  const [auth, setAuth] = useState(false)
  const limit = 50
  const stock = useSelector(state => state.stock)
  const history = useHistory()

  function autenticate() {
    api.get('/validatetoken', {
      headers: {
        'x-access-token': stock.token
      }
    })
      .then(response => {
        if (response.data.validToken) {
          setAuth(true)
        } else {
          setAuth(false)
          history.push('/')
        }
      })
      .catch(err => {

      })
  }

  // consulta de pokemons
  async function fetchPokemons(offset = 1, firstUse = false) {

    const { data } = await api.get(`/pokemon?offset=${offset}&limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': stock.token
      }
    })

    let pokemonList = data.results.map((value, index) =>
      <PokemonLine
        key={value.url}
        id={value.url.substring(34).slice(0, value.url.substring(34).length - 1)}
        getPokemonInfo={getPokemonInfo}
      >
        #{`${value.url.substring(34).slice(0, value.url.substring(34).length - 1)} ${value.name.toUpperCase()}`}
      </PokemonLine>)

    if (firstUse) {
      let pagesCount = data.count % limit > 0 ? ((data.count - (data.count % limit)) / limit) + 1 : data.count / limit
      setNumberOfPages(pagesCount)
    }

    setPokemons(pokemonList)
  }

  function changePage(pageNumber) {
    fetchPokemons((pageNumber - 1) * limit)
    setSelectedPage(pageNumber)
  }

  function getPokemonInfo(pokemonId) {
    history.push(`/detailed-info/${pokemonId}`)
  }

  useEffect(() => {
    autenticate()
    fetchPokemons(0, true)
  }, [])



  return (
    <>
      {auth
        ?
        <div className="pokemon-list-container">
          <SearchInput />
          <div className="pokemon-list-area">

            <div className="pokemon-list-list">
              {pokemons}
            </div>

            <div className="pokemons-list-pages">
              <Pages page={selectedPage} maxPages={numberOfPages} changePage={changePage}></Pages>
            </div>

          </div>

        </div>
        :
        <></>
      }
    </>
  )
}