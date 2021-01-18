import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import StateContext from '../StateContext'

function HeaderLoggedOut(props) {
  const state = useContext(StateContext)

  return (
    <div className="centered">
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="/public/img/logo.svg" alt="Logo" />
          </Link>
        </div>
        <div className="navigation">
          <div className={state.pageName=="Home"? "navigation-item active": "navigation-item"}>
            <Link to="/">Home</Link>
          </div>
          <div className={state.pageName=="About"? "navigation-item active": "navigation-item"}>
            <Link to="/about">About</Link>
          </div>
          <div className={state.pageName=="Login"? "navigation-item active": "navigation-item"}>
            <Link to="/log-in">Log In</Link>
          </div>
          <div className="navigation-item btn primary sign-up">
            <Link to="/sign-up">Sign Up</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderLoggedOut