import "./ActivityOverview.css"
import * as React from "react"
import { useActivityContext } from  "../../../contexts/activity"
import Loading from "../Loading/Loading"
import { Link } from "react-router-dom"
import ActivityOverviewCard from "../ActivityOverviewCard/ActivityOverviewCard"



export default function ActivityOverview( {} ) {
  // extract all the necessary data from useAuthContext, need to implement important back end things to do so
    
    const { getActivitySummaryStats, isLoading, setIsLoading,
    error, setError } = useActivityContext()
    
    const [summary, setSummary] = React.useState(null)
    let tempSummary = null
  
  React.useEffect(() => {
    const fetchActivitySummaries = async () => {
    try {
        setIsLoading(true)
        setError(null)
        tempSummary = await getActivitySummaryStats()
        setSummary(tempSummary.overview)
        setError(null)
    }
    catch (err)
    {
        setError(err)
        console.log("ERROR in useEffect of nutrition.jsx", err)
    }

    setIsLoading(false)
};

fetchActivitySummaries();
}, []);


  return (
    <div className="activity-overview">
      <div className="banner">
        <h1>Activity Overview</h1>
        <div className="other-buttons">
          <Link to="/exercise">
            <button className="add-btn">ADD Exercise</button>
          </Link>
          <Link to="/nutrition">
            <button className="add-btn">ADD Nutrition</button>
          </Link>
          <Link to="/sleep">
            <button className="add-btn">ADD Sleep</button>
          </Link>
        </div>
      </div>
      <div className="content">
      {
        summary===null ? <Loading /> :
        <>
            <ActivityOverviewCard 
            title="Avg Daily Calories"
            value={summary.averageDailyCalories} />
        </>
      }
      </div>
    </div>
  )
}