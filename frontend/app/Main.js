import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import IndexGuest from './components/IndexGuest'
import About from './components/About'
import Login from './components/Login'
import SignUp from './components/SignUp'

function ExampleComponent() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <IndexGuest />
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
  )
}

ReactDOM.render(<ExampleComponent />, document.querySelector("#app"))