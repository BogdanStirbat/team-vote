import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'

function About(props) {
  useEffect(() => {
    document.title="About | TeamVote"
    window.scrollTo(0, 0)
    props.setPageName("About")
  }, [])

  return (
    <div className="centered">
      <div className="about">
        <h1>About TeamVote</h1>

        <p>This application allows teams to vote, online, specific questions with multiple possible answers. This is a personal, side project.</p>
      </div>
    </div>
  )
}

export default About