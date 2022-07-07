import "./NutritionDetail.css"
import * as React from "react"
import { useParams, useResolvedPath } from "react-router-dom";
import { useNutritionContext } from "../../../contexts/nutrition";
import Loading from "../Loading/Loading"
import NutritionCard from "../NutritionCard/NutritionCard"
import NotFound from "../NotFound/NotFound";



export default function NutritionDetail( { } ) {
    let {nutritionId} = useParams()
    const { isLoading, setIsLoading, error, setError,
            getNutritionById, nutritions } = useNutritionContext()
    const [nutrition, setNutrition] = React.useState(null)
    
    const withinNutritions = (nutritionId) => {
        const newList = nutritions?.nutritions.filter((nutrition) => {
            return nutrition.id === Number(nutritionId);
        })
        if (newList?.length === 0 || newList === undefined || newList === null)
        {
          return <NotFound />
        }
        else
        {
          return <NutritionCard 
          nutrition={{
              "id": nutrition.id,
              "name": nutrition.name,
              "calories": nutrition.calories,
              "category": nutrition.category,
              "quantity": nutrition.quantity,
              "imageUrl": nutrition.image_url,
              "createdAt": nutrition.created_at}} />
        }
      }  

    let tempNutrition = null
    React.useEffect(() => {
        const fetchNutrition = async () => {
        try {
            setIsLoading(true)
            setError(null)
            tempNutrition = await getNutritionById(nutritionId)
            console.log("AFTER AWAIT",tempNutrition.nutrition)
            setNutrition(tempNutrition.nutrition)
            setError(null)
        }
        catch (err)
        {
            setError(err)
            console.log("ERROR in useEffect of nutrition.jsx", err)
        }

        setIsLoading(false)
    };

    fetchNutrition();
  }, []);

        // make the call here

    return (
        <div className="nutrition-detail">
            {nutrition===null ? <Loading /> :
            withinNutritions(nutritionId)}
        </div>
    );
}