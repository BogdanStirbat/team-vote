import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div className="centered">
      <footer>
        <Link to="/about">About</Link>
        <p>Built by <a href="https://bogdanstirbat.com">Bogdan</a></p>
      </footer>
    </div>
  )
}

export default Footer