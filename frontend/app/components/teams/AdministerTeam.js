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
  const [joinRequests, setJoinRequests] = useState([])

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
      console.log(response.data)
      setMembershipInfo(response.data)
    } catch(e) {
      console.log("Error retrieving membership info.")
      console.log(e)
    }
  }

  async function retrieveJoinRequests() {
    try {
      const response = await Axios.get("http://localhost:3001/join-request/team/" + id, 
                                      {
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + state.user.token
                                        }
                                      })

      setJoinRequests(response.data)
    } catch(e) {
      console.log("Error retrieving join requests.")
      console.log(e)
    }
  }

  useEffect(() => {
    retrieveMembershipInfo()
    retrieveJoinRequests()
  }, [])

  async function acceptJoinRequest(e) {
    e.preventDefault()
    const requestId = e.target.getAttribute("data-request-id")

    try {
      const response = await Axios.put(`http://localhost:3001/join-request/${requestId}/approve`, 
                                      {},
                                      {
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + state.user.token
                                        }
                                      })
      retrieveJoinRequests()
    } catch(e) {
      console.log("Error approving join request.")
      console.log(e)
    }
  }

  async function declineJoinRequest(e) {
    e.preventDefault()
    const requestId = e.target.getAttribute("data-request-id")

console.log(state.user.token)
    try {
      const response = await Axios.put(`http://localhost:3001/join-request/${requestId}/decline`, 
                                      {},
                                      {
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + state.user.token
                                        }
                                      })
      retrieveJoinRequests()
    } catch(e) {
      console.log("Error approving join request.")
      console.log(e)
    }
  }

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
            {
              joinRequests && joinRequests.length > 0 && 
                <div className="previous-questions-area">
                  {
                    joinRequests.map(joinRequest => {
                      return (
                        <div className="previous-question" key={joinRequest._id}>
                          <p>{joinRequest.text}</p>
                          <div className="btn primary question delete" data-request-id={joinRequest._id} onClick={acceptJoinRequest}>Accept</div>
                          <div className="btn primary question resume" data-request-id={joinRequest._id} onClick={declineJoinRequest}>Decline</div>
                        </div>
                      )
                    })
                  }
                </div>
            }
            </div>
        </div>
      </div>

    </Page>
  )
}

export default AdministerTeam