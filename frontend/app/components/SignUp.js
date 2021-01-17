import React, {useState} from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'

import Page from './Page'

function SignUp(props) {

  const history = useHistory()

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [serverValidationErrors, setServerValidationErrors] = useState([])

  async function submitClicked(e) {
    e.preventDefault()
    setServerValidationErrors([])
    try {
      const response = await Axios.post("http://localhost:3001/sign-up", {username: username, email: email, password: password})
      if (response.data) {
        props.setLoggedIn(true)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("email", response.data.email)
        localStorage.setItem("username", response.data.username)
        history.push("/")
      } else {
        console.log("Errors at login.")
      }
    } catch (e) {
      console.log("An error occurred at sign up.")
      console.log(e)
      if (e.response && e.response.data && e.response.data.length > 0) {
        setServerValidationErrors(e.response.data)
        console.log(e.response.data)
        console.log(e.response.status)
        console.log(e.response.headers)
      }
    }
  }

  return (
    <Page title="Sign Up | TeamVote"
          name="SignUp"
          setPageName={props.setPageName}>

      <div className="centered">
        <div className="login">
          <form>
            {serverValidationErrors.length > 0 &&
              <div>
                {serverValidationErrors.map(error => {return (<div className="login-error">{error}</div>)})}
              </div>
            }
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