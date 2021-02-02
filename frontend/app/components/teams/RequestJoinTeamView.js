import React, { useContext, useState, useEffect } from 'react'
import Axios from 'axios'

import Page from '../Page'
import StateContext from '../../StateContext'

function RequestJoinTeamView(props) {

  const state = useContext(StateContext)
  const [joinRequestSent, setJoinRequestSent] = useState(false)

  async function sendJoinRequest(e) {
    e.preventDefault()

    try {
      const response = await Axios.post("http://localhost:3001/join-requests", 
                                        {teamId: props.team._id},
                                        {
                                          headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + state.user.token
                                          }
                                        })

      if(response.status == 200) {
        setJoinRequestSent(true)
      }
    } catch(e) {
      console.log("An error occurred sending a join request.")
      console.log(e)
    }
  }

  async function checkRequestSent() {
    try {
      const response = await Axios.get("http://localhost:3001/join-requests?teamId=" + props.team._id, 
                                      {
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + state.user.token
                                        }
                                      })
      if (response.data.exists) {
        setJoinRequestSent(true)
      }
    } catch (e) {
      console.log("An error occurred checking if a join request was sent.")
      console.log(e)
    }
  }

  useEffect(() => {
    checkRequestSent()
  }, 
  [])

  return(
    <Page title={"Team " + props.team.name}
          page="Team">
      <div className="centered">
        <div className="join-team">
          <h1>{props.team.name}</h1>

          {
            !joinRequestSent &&
            <div className="btn primary" onClick={sendJoinRequest}>
              <a href="#">Send join request</a>
            </div>
          }

          {
            joinRequestSent &&
              <div className="join-request-sent">
                Join request was sent
              </div>
          }
        </div>
      </div>
    </Page>
  )
}

export default RequestJoinTeamView