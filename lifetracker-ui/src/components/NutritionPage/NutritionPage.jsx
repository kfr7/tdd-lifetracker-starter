import "./NutritionPage.css"
import * as React from "react"
import { Routes, Route } from "react-router-dom"
import NotFound from "../NotFound/NotFound"
import NutritionOverview from "../NutritionOverview/NutritionOverview"
import NutritionNew from "../NutritionNew/NutritionNew"
// import NutritionalDetail from "../NutritionalDetail/NutritionalDetail"
// use above for all nutrition paths


export default function NutritionPage( {} ) {
  return (
    <div className="nutrition-page">
      <div className="banner">
        <h1>Nutrition</h1>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<NutritionOverview />} />
          <Route path="/create" element={<NutritionNew />} />
          {/* <Route path="/:id/:nutritionId" element={<NutritionalDetail />}  /> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}