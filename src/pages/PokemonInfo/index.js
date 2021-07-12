import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import api from '../../services/api'
import './style.css'
import { useEffect, useState } from 'react';
import TypeText from '../../components/TypeText';
import InfoItem from '../../components/InfoItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function PokemonInfo() {

  const { id } = useParams()
  const stock = useSelector(state => state.stock)
  const history = useHistory()
  const [pokemonData, setPokemonData] = useState(false)
  const [types, setTypes] = useState([])
  const [abilities, setAbilities] = useState([])
  const [stats, setStats] = useState([])

  async function getPokemonDetailedInfo() {
    if (stock.auth) {
      await api.get(`/pokemon/${id}`, {
        headers: {
          'x-access-token': stock.token
        }
      })
        .then((response) => {
          if (!response.data.return) {
            alert(response.data.msg)
            history.push('/pokemon')
          }
          let tempData = { ...response.data }
          let tempTypes = tempData.types.map(value => <TypeText key={value.type.url}>{value.type.name.toUpperCase()}</TypeText>)

          let tempAbilities = []
          tempData.abilities.forEach(value => {
            tempAbilities.push(value.ability.name)
          })

          let tempStats = tempData.stats.map(value => <InfoItem key={value.stat.name} statName={value.stat.name}>{value.base_stat}</InfoItem>)


          setAbilities(tempAbilities)
          setTypes([...tempTypes])
          setStats([...tempStats])
          setPokemonData({ ...tempData })
        })
        .catch(err => {
        })
    } else {
      history.push('/')
    }
  }

  useEffect(() => {
    getPokemonDetailedInfo()
  }, [])

  return (
    <>
      {
        pokemonData
          ?
          <>
            <div className="background">

            </div>
            <div className="pokemon-info-container">
              <div className="pokemon-info-box">
                <div className="pokemon-info-imagearea">
                  <div className="pokemon-info-id-area">
                    <div onClick={() => {history.push('/pokemon')}} className="pokemon-info-back-button"><ArrowBackIcon /></div>
                    <div className="pokemon-info-idline">#{pokemonData.id}</div>
                  </div>
                  <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                  <span className="pokemon-info-name">{pokemonData.name}</span>
                  <div className="pokemon-info-type-area">
                    {types}
                  </div>
                </div>
                <div className="pokemon-info-stats">
                  <span className="info-area-span">Info</span>
                  <InfoItem statName="Habilidades">{abilities.join(', ')}</InfoItem>
                  <InfoItem statName="Exp base">{pokemonData.base_experience}</InfoItem>
                  <InfoItem statName="Altura">{pokemonData.height / 10} m</InfoItem>
                  <InfoItem statName="Peso">{pokemonData.weight / 10} kg</InfoItem>
                  <br />
                  <br />
                  <span className="info-area-span">Stats</span>
                  {stats}
                </div>
              </div>
            </div>
          </>
          :
          <></>
      }
    </>
  )
}