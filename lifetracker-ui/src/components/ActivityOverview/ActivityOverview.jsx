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

    const determineComponent = () => {
      if (summary===null){
        return <Loading />
      }
      else if (summary.averageDailyCalories===null) {
        return <h2 className="no-info">No information to show. Please enter some stats!</h2>
      }
      else {
        return <ActivityOverviewCard 
        title="Avg Daily Calories"
        value={summary.averageDailyCalories} />
      }
    }
  
  React.useEffect(() => {
    const fetchActivitySummaries = async () => {
    try {
        setIsLoading(true)
        setError(null)
        tempSummary = await getActivitySummaryStats()
        console.log(tempSummary.overview)
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
      <div className="activity-overview-banner">
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
        determineComponent()
      }
      </div>
    </div>
  )
}