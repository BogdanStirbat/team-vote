import React from 'react'

import Page from './Page'

function SignUp(props) {

  return (
    <Page title="Sign Up | TeamVote"
          name="SignUp"
          setPageName={props.setPageName}>

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
      
    </Page>
  )
}

export default SignUp