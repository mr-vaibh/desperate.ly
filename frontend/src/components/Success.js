import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import NotFound404 from './NotFound404'

const Green = ({ gameId }) => {
  const fullGameLink = window.location.origin + "/" + gameId
  
  const copyLink = (link) => {
    navigator.clipboard.writeText(link)
    alert("Link copied to clipboard!")
  }
  
  return (
    <>
      <div className="alert alert-success" role="alert">
        <h3>Successfully created new game</h3>
      </div>

      <h4
        className="mt-5"
        style={{cursor: "pointer"}}
        onClick={() => copyLink(fullGameLink)}
      >
        Click to copy this link <Link to={"/" + gameId}>{fullGameLink}</Link>
      </h4>

      <p style={{fontStyle: "italic"}}>
        NOTE: Anyone with the link can access the game. Only share it with your partner.
      </p>

      <Link to="/" className="btn btn-primary mt-3">back to Home</Link>
    </>
  )
}

export default function Success() {
  const [searchParams] = useSearchParams()
  const gameId = searchParams.get("gameId")

  return (
    <div className="container w-50 my-5">
      {
        gameId
          ? <Green gameId={gameId} />
          : <NotFound404 />
      }
    </div>
  )
}