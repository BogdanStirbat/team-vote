import React from 'react'
import {Link} from 'react-router-dom'

import Page from './Page'

function IndexLoggedIn(props) {
  return (
    <Page title="TeamVote"
          name="Home">

      <div className="centered">
        <div className="home-logged-in">

          <div className="create-join-team">
            <div className="btn primary">
              <Link to="/create-new-team">
                Create a new team
              </Link>
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