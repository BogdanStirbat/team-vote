import React from 'react'

import Page from '../Page'

function MemberTeamView(props) {

  return (
    <Page title={"Team " + props.team.name}
          page="Team">

      <div className="centered">
        <div className="team-area">
          <div className="online-members-area">
            <p>{props.team.name}</p>
            
            <h1>Online team members</h1>
            <div className="team-members">

            </div>
          </div>
      
          <div className="question-area">

          </div>
        </div>
      </div>

    </Page>
  )
}

export default MemberTeamView