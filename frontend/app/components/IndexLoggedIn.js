import React from 'react'

import Page from './Page'

function IndexLoggedIn(props) {
  return (
    <Page title="TeamVote"
          name="Home"
          setPageName={props.setPageName}>

      <div className="centered">
        <div className="home-logged-in">

          <div className="create-join-team">
            <div className="btn primary">
              <a href="#">Create a new team</a>
            </div>
            <p>or</p>
            <p>Join an existing team</p>

            <div className="search-team">
              <input type="text" placeholder="Search.." name="search" />
              <button type="submit"><i className="fa fa-search"></i></button>
            </div>

          </div>

          <div className="your-teams">
            <h1>Your teams</h1>
            <div className="teams-area">
              
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default IndexLoggedIn