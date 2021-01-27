import React from 'react'

import Page from '../Page'

function RequestJoinTeamView(props) {

  return(
    <Page>
      <div className="centered">
        <div className="join-team">
          <h1>{props.team.name}</h1>
      
          <div className="btn primary">
            <a href="#">Send join request</a>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default RequestJoinTeamView