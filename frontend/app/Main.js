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
    pageName: "Home",
    notifications: [],
    unreadNotificationsCount: 0
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  function reducer(draft, action) {
    switch(action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        try {
          sendUserLoggedInNotification()
        } catch(ignored) {

        }
        return

      case "logout":
        draft.loggedIn = false
        try {
          sendUserLoggedOutNotification()
        } catch(ignored) {

        }
        return

      case "changepage":
        draft.pageName = action.data
        return

      case "newNotification":
        draft.notifications.push(action.data)
        draft.unreadNotificationsCount = draft.unreadNotificationsCount + 1
        return

      case "setNotifications":
        draft.notifications = action.data
        draft.unreadNotificationsCount = draft.notifications.filter(n => !n.seen).length
        return
    }
  }

  function sendUserLoggedInNotification() {
    socket.current.emit("userLoggedIn", {
      username: state.user.username,
      email: state.user.email,
      token: state.user.token
    })
  }

  function sendUserLoggedOutNotification() {
    socket.current.emit("userLoggedOut", {
      username: state.user.username,
      email: state.user.email,
    })
  }

  useEffect(() => {
    socket.current = io("http://localhost:3001/")

    if (state.user && state.user.token) {
      sendUserLoggedInNotification()
    }

    socket.current.on("newNotification", notification => {
      dispatch({type: "newNotification", data: notification})
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