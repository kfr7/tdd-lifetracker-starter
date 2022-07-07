import "./ActivityPage.css"
import * as React from "react"
import { useAuthContext } from  "../../../contexts/auth"
import { useActivityContext } from  "../../../contexts/activity"
import Loading from "../Loading/Loading"
import ActivityFeed from "../ActivityFeed/ActivityFeed"



export default function ActivityPage( {} ) {
  // extract all the necessary data from useAuthContext, need to implement important back end things to do so
  const { activity, isLoading } = useActivityContext()
  // console.log("IN ACTIVITY PAGE", user)
  return (
    <div className="activity-page">
      <div className="banner">
        <h1>Detailed Activity Feed</h1>
      </div>
      <div className="content">
      {
        isLoading ? <Loading /> :
        <ActivityFeed />
      }
      </div>
    </div>
  )
}