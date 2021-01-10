import React from 'react'
import ReactDOM from 'react-dom'

function ExampleComponent() {
  return (
    <>
      <div className="centered">
        <nav>
          <div className="logo">
            <a href="#">
              <img src="/img/logo.svg" alt="Logo" />
            </a>
          </div>
          <div className="navigation">
            <div className="navigation-item active">
              <a href="#">Home</a>
            </div>
            <div className="navigation-item">
              <a href="#">About</a>
            </div>
            <div className="navigation-item">
              <a href="#">Log In</a>
            </div>
            <div className="navigation-item btn primary sign-up">
              <a href="#">Sign Up</a>
            </div>
          </div>
        </nav>
      </div>

      <div className="centered">
        <div className="first-page">
          <div className="description">
            <h1>Collaborate within your team!</h1>
            <p>Share ideas, ask questions and vote.</p>
            <div className="buttons">
              <div className="btn primary"><a href="#">Sign Up</a></div>
              <div className="btn secundary"><a href="#">Log In</a></div>
            </div>
          </div>
          <div className="image">
            <img src="/img/collaborate_within_team.jpg" alt="Collaborate within team image" />
            <a href='https://www.freepik.com/vectors/people'>People vector created by pch.vector - www.freepik.com</a>
          </div>
        </div>
      </div>

      <div className="functionality-brief">
        <div className="centered">
          <article>
            <div className="image">
              <img src="/img/create_join_team.jpg" />
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
              <img src="/img/start_collaborating.jpg" />
              <a href='https://www.freepik.com/vectors/technology'>Technology vector created by pch.vector - www.freepik.com</a>
            </div>
          </article>

          <article>
            <div className="image">
              <img src="/img/review_answers.jpg" />
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

      <div className="centered">
        <footer>
          <a href="#">About</a>
          <p>Built by <a href="https://bogdanstirbat.com">Bogdan</a></p>
        </footer>
      </div>
    </>
  )
}

ReactDOM.render(<ExampleComponent />, document.querySelector("#app"))