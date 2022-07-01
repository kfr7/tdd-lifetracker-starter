import "./NutritionNew.css"
import * as React from "react"
import NutritionForm from "../NutritionForm/NutritionForm"
// use above for all nutrition paths


export default function NutritionNew( {} ) {
  return (
    <div className="nutrition-new">
        <h2>
            Record Nutrition
        </h2>
        <NutritionForm />
    </div>
  )
}