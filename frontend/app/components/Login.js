import React, {useState} from 'react'
import Axios from 'axios'

import Page from './Page'

function Login(props) {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  async function loginClicked(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("http://localhost:3001/login", {email: email, password: password})
      if (response.data) {
        console.log("Login successfully", response.data)
        props.setLoggedIn(true)
      } else {
        console.log("Login failed.")
      }
    } catch(e) {
      console.log("An error occurred at login", e)
    }
  }

  return (

    <Page title="Login | TeamVote"
          name="Login"
          setPageName={props.setPageName}>

      <div className="centered">
        <div className="login">
          <form>
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