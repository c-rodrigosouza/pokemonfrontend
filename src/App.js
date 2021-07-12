import './App.css';
import { Switch, Route, Link, useHistory } from "react-router-dom";
import api from './services/api'

import LoginScreen from './pages/LoginScreen'
import PokemonList from './pages/PokemonList';
import PokemonInfo from './pages/PokemonInfo';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setToken } from './store/Stock.store';

export default function App() {

  const dispatch = useDispatch()
  const [cookie, setCookie] = useCookies(['token'])
  const stock = useSelector(state => state.stock)
  const history = useHistory()

  useEffect(() => {

    async function autenticate() {
      await api.get('/validatetoken', {
        headers: {
          'x-access-token': cookie.token !== '' ? cookie.token : stock.token
        }
      })
        .then(response => {
          if (response.data.validToken) {
            dispatch(setToken(
              {
                auth: true
              }
            ))
          } else {
            dispatch(setToken(
              {
                auth: false
              }
            ))
          }
        })
        .catch(err => {

        })
    }


    dispatch(setToken(
      {
        token: cookie.token
      }
    ))

    autenticate()
  }, [stock.auth, cookie.token, dispatch, stock.token])

  function logout() {
    api.post('/logout', {}, {
      headers: {
        'x-access-token': stock.token
      }
    })
      .then(response => {
        dispatch(setToken(
          {
            auth: false
          }
        ))
        dispatch(setToken(
          {
            token: ''
          }
        ))
        setCookie('token', response.data.token, { path: '/' })
        history.push('/')
      })
      .catch(err => {

      })
  }

  return (
    <div className="app-container">
      <nav className="app-menu">
        <Link className="app-menu-link" to="/"><span>Home</span></Link>
        <Link className="app-menu-link" to="/pokemon"><span>Lista de Pokemons</span></Link>
        {stock.auth
          ?
          <div className="app-menu-link logout" onClick={logout}><span>Sair</span></div>
          :
          <></>
        }
      </nav>

      <Switch>
        <Route exact path="/detailed-info/:id">
          <PokemonInfo />
        </Route>
        <Route exact path="/pokemon">
          <PokemonList />
        </Route>
        <Route exact path="/">
          <LoginScreen logout={logout} />
        </Route>
      </Switch>
    </div>
  );
}