import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { setToken } from '../../store/Stock.store';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import './style.css'
import api from '../../services/api'

import pokemonLogo from '../../imgs/pokemon-logo.png'
import { useHistory } from 'react-router';

export default function LoginScreen({logout}) {

  const dispatch = useDispatch()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [wrongUser, setWrongUser] = useState(<></>)
  const [cookies, setCookie] = useCookies(['token']);
  const stock = useSelector(state => state.stock)
  const history = useHistory()

  function handleUser() {
    api.post('/login', {
      user: user,
      password: password
    })
      .then(function (response) {
        if (response.data.auth) {
          dispatch(setToken({
            token: response.data.token,
            auth: true
          }))
          setCookie('token', response.data.token, { path: '/' })
          setWrongUser(<></>)
        } else {
          setWrongUser(<p className="wrong-user">{response.data.msg}</p>)
        }
      })
      .catch(function (error) {

      })
  }

  function keyListener(key) {
    if (key === 'Enter') {
      handleUser()
    }
  }

  return (

    <div className="login-screen-container">
      <img src={pokemonLogo} alt="pokemon logo" className={`login-background ${stock.auth ? 'login-background-auth' : ''}`}></img>
      {
        !stock.auth
          ?
          <>
            <form className="form" onKeyPress={event => { keyListener(event.key) }}>
            <p className="p-msg">Faça login para ter acesso a lista de pokemons.</p>
              <TextField className="input" id="user" label="Usuário" variant="outlined" onInput={txt => { setUser(txt.target.value) }} />
              <TextField className="input" id="password" type="password" label="Senha" variant="outlined" onInput={txt => { setPassword(txt.target.value) }} />
              <Button variant="contained" color="primary" onClick={handleUser} >
                Entrar
              </Button>
            </form>
            {wrongUser}
          </>
          :
          <div className="login-screen-authenticated-area">
            <p>Você está autenticado! Acesse a lista para ver as informações sobre os pokemons.</p>
            <div className="button-to-pokemon-list" onClick={() => {history.push('/pokemon')}}>Ir para a lista</div>
            <div className="button-logout" onClick={logout}>Encerrar sessão</div>
          </div>
      }
    </div>
  )
}