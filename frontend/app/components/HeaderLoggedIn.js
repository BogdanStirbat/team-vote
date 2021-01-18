import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'

import DispatchContext from '../DispatchContext'

function HeaderLoggedIn(props) {
  const dispatch = useContext(DispatchContext)
  const history = useHistory()

  function logout(e) {
    e.preventDefault()

    dispatch({type: "logout"})
    history.push("/")
  }

  return (
    <div className="centered">
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="/public/img/logo.svg" alt="Logo" />
          </Link>
        </div>
        <div className="navigation">
          <div className={props.pageName=="Home"? "navigation-item active": "navigation-item"}>
            <Link to="/">Home</Link>
          </div>
          <div className={props.pageName=="About"? "navigation-item active": "navigation-item"}>
            <Link to="/about">About</Link>
          </div>
          <div onClick={logout} className="avatar">
            <a href="#">
              <img src="/public/img/avatar-default.svg" alt="Avatar" />
            </a>
          </div>
          <div className="notifications-icon">
            <img src="/public/img/notifications.svg" alt="Avatar" />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderLoggedIn