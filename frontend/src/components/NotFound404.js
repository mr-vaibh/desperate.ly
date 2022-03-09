import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound404() {
  return (
    <div className="container w-50 my-5">
      <div className="alert alert-danger" role="alert">
        <h3>404 Page not found</h3>
      </div>

      <h4 className="mt-5">
        Sorry, you might have lost somewhere
      </h4>

      <Link to="/" className="btn btn-primary mt-3">back to Home</Link>
    </div>
  )
}
