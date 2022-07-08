import * as React from "react"
import ApiClient from "../services/apiClient"
import { useAuthContext } from "./auth"
import { useNutritionContext } from "./nutrition"
// const { API_BASE_URL } = require("../constants")
import API_BASE_URL from "../constants"

const ActivityContext = React.createContext()

export const ActivityContextProvider = ({ children }) => {
    // const [refresh, setRefresh] = React.useState(false)
    const [activity, setActivity] = React.useState(null)
    const [initialized, setInitialized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    console.log("activity context provider entered for some reason")
    const { user } = useAuthContext()
    const { nutritions } = useNutritionContext()
    const apiClient = new ApiClient(API_BASE_URL)
    let tempActivity = null
    React.useEffect(() => {
        console.log("Entered use effect for the activityContext.Provider")
        const fetchActivity = async () => {
            if (user !== null && user != {}) {
                try {
                    console.log("1. ENTERED THE TRY")
                    setIsLoading(true)
                    setError(null)
                    console.log(user)
                    tempActivity = await getActivity()
                    setActivity(tempActivity)
                    setError(null)
                }
                catch (err)
                {
                    setError(err)

                    console.log("ERROR in useEffect of activity.jsx", err)
                }
                setIsLoading(false)
                setInitialized(true)
            }
        }
        fetchActivity()
        
  }, [user, nutritions]);

  const getActivity = async () => {
    return await apiClient.fetchActivity(user.id)
    }

  const getActivitySummaryStats = async () => {
    return await apiClient.getActivitySummaryStats(user.id)
    }


  
  return (
    <ActivityContext.Provider value={{  activity, setActivity,
                                    initialized, setInitialized,
                                    isLoading, setIsLoading,
                                    error, setError, getActivitySummaryStats}}>
      {children}
    </ActivityContext.Provider>
  );
};


export const useActivityContext = () => {
    return React.useContext(ActivityContext);
}