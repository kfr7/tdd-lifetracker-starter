import "./NutritionOverview.css"
import * as React from "react"
import { Link } from "react-router-dom"
import NutritionFeed from "../NutritionFeed/NutritionFeed"
// use above for all nutrition paths


export default function NutritionOverview( {} ) {
  return (
    <div className="nutrition-overview">
    
      <div className="banner">
        <h3>Overview</h3>
        <Link to="/nutrition/create">
            <button className="Button outline small outline aqua ">Record Nutrition</button>
        </Link>
      </div>
      <NutritionFeed />
    
    </div>
  )
}