import './style.css'

export default function PokemonLine({ children, id, getPokemonInfo }) {

  return (
    <button className='pokemon-line-button' onClick={() => { getPokemonInfo(id) }}>{children}</button>
  )
}
