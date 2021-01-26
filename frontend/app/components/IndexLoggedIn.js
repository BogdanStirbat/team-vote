import React, { useEffect, useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

import Page from './Page'
import StateContext from '../StateContext'

function IndexLoggedIn(props) {

  const state = useContext(StateContext)
  const [teams, setTeams] = useState([])

  async function retrieveTeams() {
    try {
      const response = await Axios.get("http://localhost:3001/teams/my-teams", 
                                       {
                                         headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + state.user.token
                                         }
                                       })
      console.log(response.data)
      setTeams(response.data)
    } catch(e) {
      console.log("Error retrieving teams.")
      console.log(e)
    }
  }

  useEffect(() => {
    retrieveTeams()
  }, [])

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
              {
                teams && teams.length > 0 && 
                <>
                  {
                    teams.map(team => {
                      return (
                        <div className="team-name" key={team._id}>
                          <a href="#">{team.name}</a>
                        </div>
                      )
                    })}
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default IndexLoggedIn