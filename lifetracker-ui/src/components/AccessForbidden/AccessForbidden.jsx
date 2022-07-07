import "./AccessForbidden.css"
import * as React from "react"
import { Link } from "react-router-dom"


export default function AccessForbidden( {} ) {
  return (
    <div className="access-forbidden">
      <h2 className="af-header">
        Access Forbidden ☹️
      </h2>
      <div className="content">
        <div className="redirect-button">
          <p>Have an account already?</p>
          <Link to="/login">
            <button className="redirect-btn">Login</button>
          </Link>
        </div>
        <div className="redirect-button">
          <p>Want to sign up?</p>
          <Link to="/register">
            <button className="redirect-btn">Register</button>
          </Link>
        </div>
  
      </div>
    </div>
  )
}