import React from 'react'

import Page from './Page'

function About(props) {

  return (
    <Page title="About | TeamVote"
          name="About">

      <div className="centered">
        <div className="about">
          <h1>About TeamVote</h1>

          <p>This application allows teams to vote, online, specific questions with multiple possible answers. This is a personal, side project.</p>
        </div>
      </div>

    </Page>
    
  )
}

export default About