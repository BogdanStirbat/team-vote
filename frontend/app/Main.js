import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import IndexGuest from './components/IndexGuest'
import About from './components/About'
import Login from './components/Login'
import SignUp from './components/SignUp'

function ExampleComponent() {
  const [pageName, setPageName] = useState("Home")

  return (
    <BrowserRouter>
      <Header pageName={pageName} />
      <Switch>
        <Route path="/" exact>
          <IndexGuest setPageName={setPageName} />
        </Route>
        <Route path="/about">
          <About setPageName={setPageName} />
        </Route>
        <Route path="/log-in">
          <Login setPageName={setPageName} />
        </Route>
        <Route path="/sign-up">
          <SignUp setPageName={setPageName} />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.render(<ExampleComponent />, document.querySelector("#app"))