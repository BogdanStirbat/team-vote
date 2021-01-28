import React, { useEffect, useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

import Page from './Page'
import StateContext from '../StateContext'

function IndexLoggedIn(props) {

  const state = useContext(StateContext)
  const [teams, setTeams] = useState([])
  const [searchTeamName, setSearchTeamName] = useState()
  const [searchTeamResults, setSearchTeamResults] = useState([])
  const [noSearchResultsFound, setNoSearchResultsFound] = useState(false)

  async function searchTeams() {
    try {
      const response = await Axios.get("http://localhost:3001/teams/search?q=" + searchTeamName, 
                                      {
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + state.user.token
                                        }
                                      })
      setSearchTeamResults(response.data)
      console.log(response.data)
      if (response.data.length == 0) {
        setNoSearchResultsFound(true)
      }
    } catch(e) {
      console.log("Error searching teams.")
      console.log(e)
    }
  }

  async function retrieveTeams() {
    try {
      const response = await Axios.get("http://localhost:3001/teams/my-teams", 
                                       {
                                         headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + state.user.token
                                         }
                                       })
      setTeams(response.data)
    } catch(e) {
      console.log("Error retrieving teams.")
      console.log(e)
    }
  }

  function onSearchFieldChange(e) {
    setSearchTeamName(e.target.value)
    setNoSearchResultsFound(false)
    setSearchTeamResults([])
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
              <input onChange={onSearchFieldChange} type="text" placeholder="Search.." name="search" />
              <button onClick={searchTeams} type="submit"><i className="fa fa-search"></i></button>
            </div>

            { 
              searchTeamResults && searchTeamResults.length > 0 &&
                <div className="search-results">
                  {
                    searchTeamResults.map(team => {
                      return <Link to={"/team/" + team._id}>{team.name}</Link>
                    })
                  }
                </div>
            }

            {
              noSearchResultsFound &&
                <div className="no-search-results">
                  No search results was found.
                </div>
            }

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
                          <Link to={"/team/" + team._id}>{team.name}</Link>
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