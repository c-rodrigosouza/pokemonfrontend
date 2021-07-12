import './style.css'
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SearchInput() {
  const [textInput, setTextInput] = useState('')
  const history = useHistory()

  function searchPokemon() {
    history.push(`/detailed-info/${textInput}`)
  }

  function keyListener(key) {
    if (key === 'Enter') {
      history.push(`/detailed-info/${textInput}`)
    }
  }

  return (
    <div onKeyPress={event => { keyListener(event.key) }} className="search-input-container">
      <input type="text" onInput={txt => { setTextInput(txt.target.value) }} placeholder="Busque por nome/ID"></input>
      <button onClick={searchPokemon}><SearchIcon /></button>
    </div>
  )
}