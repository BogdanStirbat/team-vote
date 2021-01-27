import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import AdminTeamView from './AdminTeamView'
import RequestJoinTeamView from './RequestJoinTeamView'

import StateContext from '../../StateContext'

function TeamMain(props) {
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

  if (membershipInfo.membershipStatus == "not_computed") {
    return (
      <div>
        Not computed.
      </div>
    )
  }

  if (membershipInfo.membershipStatus == "admin") {
    return <AdminTeamView team={membershipInfo.team} />
  }

  if (membershipInfo.membershipStatus == "member") {
    return (
      <div>
        Member.
      </div>
    )
  }

  return <RequestJoinTeamView team={membershipInfo.team} />
}

export default TeamMain