import React, {useState, useContext} from 'react'
import Axios from 'axios'

import Page from './Page'
import StateContext from '../StateContext'

function CreateNewTeam() {

  const state = useContext(StateContext)

  const [name, setName] = useState()
  const [successMessage, setSuccessMessage] = useState()
  const [serverErrors, setServerErrors] = useState([])

  async function createTeam(e) {
    e.preventDefault()

    setSuccessMessage()
    setServerErrors([])

    try {
      const response = await Axios.post("http://localhost:3001/teams", 
                                        {name: name},
                                        {
                                          headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + state.user.token
                                          }
                                        }
                                        )
      setSuccessMessage("Team was successfully created.")
    } catch (e) {
      console.log(e)
      if (e.response && e.response.data && e.response.data.length > 0) {
        setServerErrors(e.response.data)
      }
    }
  }

  return (
    <Page title="Create new team" 
          name="CreateNewTeam">

      <div className="centered">
        <div className="create-team">
          <h1>Team Name</h1>

          <div className="create-team-area">
            {
              successMessage &&
              <div>
                <div className="success-message">{successMessage}</div>
              </div>
            }

            {
              serverErrors.length > 0 &&
              <div>
                {serverErrors.map(error => {return (<div className="error-message">{error}</div>)})}
              </div>
            }
            <input onChange={e => setName(e.target.value)} type="text" placeholder="Team name" name="name" />
          </div>
      
          <div className="btn primary" onClick={createTeam}>
            <a href="#">Create</a>
          </div>
        </div>
      </div>

    </Page>
  )
}

export default CreateNewTeam