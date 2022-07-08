import "./NutritionOverview.css"
import * as React from "react"
import { Link } from "react-router-dom"
import NutritionFeed from "../NutritionFeed/NutritionFeed"
import { useNutritionContext } from "../../../contexts/nutrition"
import Loading from "../Loading/Loading"
// use above for all nutrition paths


export default function NutritionOverview( {} ) {
  const {error, isLoading } = useNutritionContext()

  return (
    <div className="nutrition-overview">
    
      <div className="banner">
        <h3>Overview</h3>
        <Link to="/nutrition/create">
            <button className="record-btn">Record Nutrition</button>
        </Link>
      </div>
      {isLoading ? 
      <Loading />
      : <NutritionFeed />}
    
    </div>
  )
}