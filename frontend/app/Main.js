import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { useImmerReducer } from "use-immer"

import DispatchContext from './DispatchContext'
import StateContext from './StateContext'

import HeaderLoggedOut from './components/HeaderLoggedOut'
import HeaderLoggedIn from './components/HeaderLoggedIn'
import Footer from './components/Footer'
import IndexGuest from './components/IndexGuest'
import IndexLoggedIn from './components/IndexLoggedIn'
import About from './components/About'
import Login from './components/Login'
import SignUp from './components/SignUp'

function MainComponent() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    user: {
      token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
      username: localStorage.getItem("username")
    },
    pageName: "Home"
  }

  function reducer(draft, action) {
    switch(action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
      case "changepage":
        draft.pageName = action.data
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("token", state.user.token)
      localStorage.setItem("email", state.user.email)
      localStorage.setItem("username", state.user.username)
    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      localStorage.removeItem("username")
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          {state.loggedIn? <HeaderLoggedIn />: <HeaderLoggedOut />}
          <Switch>
            <Route path="/" exact>
              {state.loggedIn? <IndexLoggedIn />: <IndexGuest />}
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/log-in">
              <Login />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<MainComponent />, document.querySelector("#app"))