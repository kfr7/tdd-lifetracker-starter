import "./ActivityFeed.css"
import * as React from "react"
import { useActivityContext } from  "../../../contexts/activity"
import SummaryStat from "../SummaryStat/SummaryStat"
import moment from "moment"




export default function ActivityFeed( {} ) {
  const { activity } = useActivityContext()
  console.log("Activity:", activity?.nutrition?.calories)
  return (
    <div className="activity-feed">
        <div className="per-category">
            <h4 id="avgCalPerCat">Average Calories Per Category</h4>
            <div className="grid">
            {activity===null ? <p className="empty-message">Nothing here yet</p> :
            activity?.nutrition?.calories?.perCategory.slice(0, 6).map((tuple, idx) => (
                <SummaryStat 
                key={idx}
                stat={tuple.avgCaloriesPerCategory}
                label="calories"
                substat={tuple.category}
                type="perCategory" />))}
            </div>
        </div>
        <div className="per-day">
            <h4 id="totCalPerDay">Total Calories Per Day</h4>
            <div className="grid">
            {activity===null ? <p className="empty-message">Nothing here yet</p> :
            activity?.nutrition?.calories?.perDay.slice(0, 6).map((tuple, idx) => (
                <SummaryStat 
                key={idx}
                stat={tuple.totalCaloriesPerDay}
                label="calories"
                substat={moment(new Date(tuple.date)).format('MM/DD/YYYY')}
                type="perDay" />))}
            </div>
        </div>
    </div>
  )
}