import React, {useState} from 'react'
import Axios from 'axios'
import { useHistory } from "react-router-dom";

import Page from './Page'

function Login(props) {

  const history = useHistory();

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorLoginMesage, setErrorLoginMessage] = useState()

  async function loginClicked(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("http://localhost:3001/login", {email: email, password: password})
      if (response.data) {
        props.setLoggedIn(true)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("email", response.data.email)
        localStorage.setItem("username", response.data.username)
        history.push("/")
      } else {
        console.log("Login failed.")
        setErrorLoginMessage("Invalid username / password.")
      }
    } catch(e) {
      console.log("An error occurred at login", e)
      setErrorLoginMessage("An error occurred. Please try again later.")
    }
  }

  return (

    <Page title="Login | TeamVote"
          name="Login"
          setPageName={props.setPageName}>

      <div className="centered">
        <div className="login">
          <form>
            {(errorLoginMesage && errorLoginMesage.length > 0) &&
              <div>
                <div className="login-error">{errorLoginMesage}</div>
              </div>
            }
            <div className="form-element">
              <label htmlFor="email-login">Email</label>
              <input onChange={e => setEmail(e.target.value)} id="email-login" name="email" type="text" placeholder="Email" autoComplete="off" />
            </div>

            <div className="form-element">
              <label htmlFor="password-login">Password</label>
              <input onChange={e => setPassword(e.target.value)} id="password-login" name="password" type="password" placeholder="Password" autoComplete="off" />
            </div>
            <div className="login-btn" onClick={loginClicked}>
              <div className="btn primary">
                <a href="#">Log In</a>
              </div>
            </div>
          </form>
        </div>
      </div>

    </Page>
  )
}

export default Login