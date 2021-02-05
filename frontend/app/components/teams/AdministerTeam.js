import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import Page from '../Page'

import StateContext from '../../StateContext'

function AdministerTeam(props) {
  const { id } = useParams()
  const [membershipInfo, setMembershipInfo] = useState({
    team: {},
    "membershipStatus": "not_computed"
  })

  const state = useContext(StateContext)

  async function retrieveMembershipInfo() {
    try {
      const response = await Axios.get("http://localhost:3001/teams/" + id + "/logged-in-user/membership-info", 
                                       {
                                         headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + state.user.token
                                         }
                                       })
                                       
      setMembershipInfo(response.data)
    } catch(e) {
      console.log("Error retrieving membership info.")
      console.log(e)
    }
  }

  useEffect(() => {
    retrieveMembershipInfo()
  }, [])

  return (
    <Page title={"Administer Team " + membershipInfo.team.name? membershipInfo.team.name: ''}
          page="Team">

      <div className="centered">
        <div className="team-area admin">
          <div className="online-members-area">
            <p>{membershipInfo.team.name? membershipInfo.team.name: 'Team name'}</p>
            <h1>Team members</h1>
            <div className="team-members">
            </div>
          </div>
    
          <div className="previous-questions">
            <h1>Join requests</h1>
              <div className="previous-questions-area">
              </div>
            </div>
        </div>
      </div>

    </Page>
  )
}

export default AdministerTeam