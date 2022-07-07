import "./ActivityPage.css"
import * as React from "react"
import { useAuthContext } from  "../../../contexts/auth"
import { useActivityContext } from  "../../../contexts/activity"



export default function ActivityPage( {} ) {
  // extract all the necessary data from useAuthContext, need to implement important back end things to do so
  const { activity} = useActivityContext()
  // console.log("IN ACTIVITY PAGE", user)
  return (
    <div className="activity-page">
      <div className="banner-activity">
        <h1>All Activity...</h1>
        {activity ? <h1>There is Activity</h1> : <h1>No Activity</h1>}
      </div>
    </div>
  )
}