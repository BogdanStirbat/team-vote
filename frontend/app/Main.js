import React, {useEffect, useState, useRef} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { useImmerReducer } from "use-immer"
import io from "socket.io-client"

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
import CreateNewTeam from './components/CreateNewTeam'
import TeamMain from './components/teams/TeamMain'
import AdministerTeam from './components/teams/AdministerTeam'

function MainComponent() {
  const socket = useRef(null)
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
    socket.current = io("http://localhost:3001/")

    if (state.user && state.user.token) {
      socket.current.emit("userLoggedIn", {username: state.user.username, token: state.user.token})
    }

    socket.current.on("userLoggedInAck", message => {
      console.log("Received socket message from server")
      console.log(message)
    })

    return () => socket.current.disconnect()
  }, [])

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
            <Route path="/create-new-team">
              <CreateNewTeam />
            </Route>
            <Route path="/team/:id">
              <TeamMain />
            </Route>
            <Route path="/teams/administer/:id">
              <AdministerTeam />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<MainComponent />, document.querySelector("#app"))