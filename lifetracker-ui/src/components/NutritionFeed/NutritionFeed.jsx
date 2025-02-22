import "./NutritionFeed.css"
import * as React from "react"
import NutritionCard from "../NutritionCard/NutritionCard"
import { useNutritionContext } from  "../../../contexts/nutrition"
// use above for all nutrition paths


export default function NutritionOverview( {} ) {
  const { nutritions } = useNutritionContext()
  
//   React.useEffect(() => {
//     console.log(nutritions)
// }, [nutritions]);
console.log(nutritions?.nutritions)

  return (
    <div className="nutrition-feed">
      <div className="grid">
        {nutritions===null ? <p className="empty-message">Nothing here yet</p> :
        nutritions?.nutritions.map((nutrition, idx) => (
            <NutritionCard 
            key={idx}
            nutrition={{
                        "id":nutrition.id,
                        "name": nutrition.name,
                        "calories": nutrition.calories,
                        "category": nutrition.category,
                        "quantity": nutrition.quantity,
                        "imageUrl": nutrition.image_url,
                        "createdAt": nutrition.created_at}} />))}
      </div>
    </div>
  )
}