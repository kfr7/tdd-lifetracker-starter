import "./ActivityPage.css"
import * as React from "react"
import { useAuthContext } from  "../../../contexts/auth"


export default function ActivityPage( {} ) {
  const { user } = useAuthContext()
  return (
    <div className="activity-page">
      Got here
    </div>
  )
}