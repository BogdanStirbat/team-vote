import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'

function SignUp(props) {
  useEffect(() => {
    document.title = "Sign Up | TeamVote"
    window.scrollTo(0, 0)
    props.setPageName("SignUp")
  }, [])

  return (
    <div className="centered">
      <div className="login">
        <form>
          <div className="form-element">
            <label htmlFor="username-login">Username</label>
            <input id="username-login" name="username" type="text" placeholder="Username" autoComplete="off" />
          </div>

          <div className="form-element">
            <label htmlFor="email-login">Email</label>
            <input id="email-login" name="email" type="text" placeholder="Email" autoComplete="off" />
          </div>

          <div className="form-element">
            <label htmlFor="password-login">Password</label>
            <input id="password-login" name="password" type="password" placeholder="Password" autoComplete="off" />
          </div>
          <div className="login-btn">
            <div className="btn primary">
              <a href="#">Sign up</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp