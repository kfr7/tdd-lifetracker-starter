import "./ActivityPage.css"
import * as React from "react"
import { useAuthContext } from  "../../../contexts/auth"


export default function ActivityPage( {} ) {
  // extract all the necessary data from useAuthContext, need to implement important back end things to do so
  const { user } = useAuthContext()
  // console.log("IN ACTIVITY PAGE", user)
  return (
    <div className="activity-page">
      <div className="banner-activity">
        <h1>All Activity...</h1>
      </div>
    </div>
  )
}