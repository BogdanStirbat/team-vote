import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import HeaderLoggedOut from './components/HeaderLoggedOut'
import HeaderLoggedIn from './components/HeaderLoggedIn'
import Footer from './components/Footer'
import IndexGuest from './components/IndexGuest'
import IndexLoggedIn from './components/IndexLoggedIn'
import About from './components/About'
import Login from './components/Login'
import SignUp from './components/SignUp'

function ExampleComponent() {
  const [pageName, setPageName] = useState("Home")
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")))

  return (
    <BrowserRouter>
      {loggedIn? <HeaderLoggedIn pageName={pageName} setLoggedIn={setLoggedIn} />: <HeaderLoggedOut pageName={pageName} />}
      <Switch>
        <Route path="/" exact>
          {loggedIn? <IndexLoggedIn setPageName={setPageName} />: <IndexGuest setPageName={setPageName} />}
        </Route>
        <Route path="/about">
          <About setPageName={setPageName} />
        </Route>
        <Route path="/log-in">
          <Login setPageName={setPageName} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/sign-up">
          <SignUp setPageName={setPageName} setLoggedIn={setLoggedIn} />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.render(<ExampleComponent />, document.querySelector("#app"))