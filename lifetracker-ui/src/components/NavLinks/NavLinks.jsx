import "./NavLinks.css"
import * as React from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from  "../../../contexts/auth"



export default function NavLinks( { } ) {

  const { user, logoutUser } = useAuthContext()

  return (
    <div className="nav-links">
        <Link to="/activity/overview">
          <button className="nav-btn">Activity Overview</button>
        </Link>
        <Link to="/activity">
          <button className="nav-btn">Activity Details</button>
        </Link>
        <Link to="/exercise">
          <button className="nav-btn">Exercise</button>
        </Link>
        <Link to="/nutrition">
          <button className="nav-btn">Nutrition</button>
        </Link>
        <Link to="/sleep">
          <button className="nav-btn">Sleep</button>
        </Link>
        {
          user !== null ? 
            <Link to="/">
              <button className="nav-btn" onClick={() => {
                logoutUser()
              }}>Log Out</button>
            </Link>
          :
          <>
            <Link to="/login">
              <button className="nav-btn">Log In</button>
            </Link>
            <Link to="/register">
              <button className="nav-btn">Register</button>
            </Link>
          </>
        }
    </div>
  )
}