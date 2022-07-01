import * as React from "react"
import ApiClient from "../services/apiClient"
// const { API_BASE_URL } = require("../constants")
const API_BASE_URL = "http://localhost:3001"
import { useAuthContext } from  "./auth"



const NutritionContext = React.createContext()

export const NutritionContextProvider = ({ children }) => {
    const [refresh, setRefresh] = React.useState(false)
    const [nutritions, setNutritions] = React.useState(null)
    const [initialized, setInitialized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const apiClient = new ApiClient(API_BASE_URL)
    const { user } = useAuthContext()
    let tempNutritions = null
    
    React.useEffect(() => {
        console.log("USING EFFECT for Nutrition")
        const fetchNutritions = async () => {
        try {
            console.log("About to check condition, user is:", user.id)
            if (user !== null)
            {
                setIsLoading(true)
                setError(null)
                tempNutritions = await getNutritions()
                setNutritions(tempNutritions)
                setError(null)
            }
        }
        catch (err)
        {
            setError(err)
            console.log("ERROR in useEffect of nutrition.jsx", err)
        }

        setIsLoading(false)
        setInitialized(true)
    };

    fetchNutritions();
  }, [user, refresh, setRefresh]);

    const postNutritionItem = async (nutritionItem) => {
        if (!user.hasOwnProperty("id"))
        {
            console.log("Can't post the item without being logged in")
            return null
        }
        return await (apiClient.postNutritionItem(nutritionItem, user.id))
    }

    const getNutritions = async () => {
        return await (apiClient.getNutritions(user.id))
    }

  
  return (
    <NutritionContext.Provider value={{  nutritions, setNutritions,
                                    initialized, setInitialized, 
                                    isLoading, setIsLoading,
                                    error, setError, 
                                    postNutritionItem, getNutritions,
                                    refresh, setRefresh}}>
      {children}
    </NutritionContext.Provider>
  );
};


export const useNutritionContext = () => {
    return React.useContext(NutritionContext);
    
   };
