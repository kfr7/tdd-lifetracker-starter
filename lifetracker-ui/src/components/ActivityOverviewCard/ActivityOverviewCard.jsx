import "./ActivityOverviewCard.css"
import * as React from "react"
// use above for all nutrition paths


export default function ActivityOverviewCard( {title, value } ) {
  return (
        <div className="overview-card">
                <h3 className="summary-name">{title}</h3>
                <h3 className="summary-value">{value}</h3>
        </div>
  )
}