import "./NutritionCard.css"
import * as React from "react"
import moment from "moment"
// use above for all nutrition paths


export default function NutritionCard( {nutrition } ) {
  return (
    <div className="nutrition-card">
        <div className="header-title">
            <div className="nutrition-image">
                <img className="nutrition-actual-image" src={nutrition.imageUrl} alt="photo of food" />
            </div>
            <div className="nutrition-name">
                <h5>Name: {nutrition.name}</h5>
            </div>
        </div>
        <div className="card-stats">
            <div className="nutrition-calories">
                Calories: {nutrition.calories}
            </div>
            <div className="nutrition-category">
                Category: {nutrition.category}
            </div>
            <div className="nutrition-quantity">
                Quantity: {nutrition.quantity}
            </div>
        </div>
        <div className="nutrition-date">
            Created At: {moment(new Date(nutrition.createdAt)).format('MMMM Do, YYYY, HH:mm a')}
        </div>
       
    </div>
  )
}