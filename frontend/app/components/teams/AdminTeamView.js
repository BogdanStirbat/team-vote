import React from 'react'
import {Link} from 'react-router-dom'

import Page from '../Page'

function AdminTeamView(props) {

  return (
    <Page title={"Team " + props.team.name}
          page="Team">

      <div className="centered">
        <div className="team-area admin">
          <div className="online-members-area">
            <p>{props.team.name}</p>
            <div className="btn primary admin-changes">
              <Link to={`/teams/administer/${props.team._id}`}>Make changes to this team</Link>
            </div>
            <h1>Online team members</h1>
            <div className="team-members">

            </div>
          </div>
      
          <div className="question-area admin">

          </div>
        </div>
      </div>

    </Page>
  )
}

export default AdminTeamView