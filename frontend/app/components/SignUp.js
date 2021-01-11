import React, {useState} from 'react'
import Axios from 'axios'

import Page from './Page'

function SignUp(props) {

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  async function submitClicked(e) {
    e.preventDefault()
    try {
      await Axios.post("http://localhost:3001/sign-up", {username: username, email:email, password: password})
    } catch (e) {
      console.log("An error occurred at sign up.")
      console.log(e)
    }
  }

  return (
    <Page title="Sign Up | TeamVote"
          name="SignUp"
          setPageName={props.setPageName}>

      <div className="centered">
        <div className="login">
          <form>
            <div className="form-element">
              <label htmlFor="username-login">Username</label>
              <input onChange={(e) => setUsername(e.target.value)} id="username-login" name="username" type="text" placeholder="Username" autoComplete="off" />
            </div>

            <div className="form-element">
              <label htmlFor="email-login">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} id="email-login" name="email" type="text" placeholder="Email" autoComplete="off" />
            </div>

            <div className="form-element">
              <label htmlFor="password-login">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} id="password-login" name="password" type="password" placeholder="Password" autoComplete="off" />
            </div>
            <div className="login-btn" onClick={submitClicked}>
              <div className="btn primary">
                <a href="#">Sign up</a>
              </div>
            </div>
          </form>
        </div>
      </div>      

    </Page>
  )
}

export default SignUp