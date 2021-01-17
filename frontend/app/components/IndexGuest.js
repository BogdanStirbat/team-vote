import React from 'react'
import {Link} from 'react-router-dom'

import Page from './Page'

function IndexGuest(props) {

  return (
    <Page title="TeamVote"
          name="Home"
          setPageName={props.setPageName}>

      <div className="centered">
        <div className="first-page">
          <div className="description">
            <h1>Collaborate within your team!</h1>
            <p>Share ideas, ask questions and vote.</p>
            <div className="buttons">
              <div className="btn primary"><Link to="/sign-up">Sign Up</Link></div>
              <div className="btn secundary"><Link to="/log-in">Log In</Link></div>
            </div>
          </div>
          <div className="image">
            <img src="/public/img/collaborate_within_team.jpg" alt="Collaborate within team image" />
            <a href='https://www.freepik.com/vectors/people'>People vector created by pch.vector - www.freepik.com</a>
          </div>
        </div>
      </div>

      <div className="functionality-brief">
        <div className="centered">
          <article>
            <div className="image">
              <img src="/public/img/create_join_team.jpg" />
              <a href='https://www.freepik.com/vectors/people'>People vector created by pch.vector - www.freepik.com</a>
            </div>
            <div className="description">
              <h1>Create a team, or join an existing one</h1>
              <p>After loggin in, you can create teams and join teams.</p>
              <p>In the team space, you can collaborate, ask questions, and vote.</p>
            </div>
          </article>

          <article>
            <div className="description">
              <h1>Start collaborating</h1>
              <p>Discuss ideas and consult your team members.</p>
              <p>Ask questions, and the team members will vote.</p>
            </div>
            <div className="image even-row">
              <img src="/public/img/start_collaborating.jpg" />
              <a href='https://www.freepik.com/vectors/technology'>Technology vector created by pch.vector - www.freepik.com</a>
            </div>
          </article>

          <article>
            <div className="image">
              <img src="/public/img/review_answers.jpg" />
              <a href='https://www.freepik.com/vectors/technology'>Technology vector created by pch.vector - www.freepik.com</a>
            </div>
            <div className="description">
              <h1>Review answers</h1>
              <p>You can revisit past conclusions drawn by your team.</p>
              <p>You can always check if past conclusions still hold.</p>
            </div>
          </article>
        </div>
      </div>

    </Page>
  )
}

export default IndexGuest