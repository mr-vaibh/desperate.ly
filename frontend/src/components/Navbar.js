import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand mb-0 h1 fs-3">
          <Link to="/" style={{textDecoration: 'none'}}>Desperate.ly</Link>
          - by Vaibhav
        </span>
      </div>
    </nav>
  )
}
