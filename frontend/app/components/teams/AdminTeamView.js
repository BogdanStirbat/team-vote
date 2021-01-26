import React from 'react'

import Page from '../Page'

function AdminTeamView(props) {

  return (
    <Page title="Team"
          page="Team">

      <div className="centered">
        <div className="team-area admin">
          <div className="online-members-area">
            <p>Team name</p>
            <div className="btn primary admin-changes">
              <a href="#">Make changes to this team</a>
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