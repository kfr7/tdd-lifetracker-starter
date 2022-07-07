import * as React from "react"
import ApiClient from "../services/apiClient"
import { useAuthContext } from "./auth"
// const { API_BASE_URL } = require("../constants")
const API_BASE_URL = "http://localhost:3001"

const ActivityContext = React.createContext()

export const ActivityContextProvider = ({ children }) => {
    // const [refresh, setRefresh] = React.useState(false)
    const [activity, setActivity] = React.useState(null)
    const [initialized, setInitialized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    console.log("activity context provider entered for some reason")
    const { user } = useAuthContext()
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
        
  }, [user]);

  const getActivity = async () => {
    console.log("2. ENTERED fetchActivity in activity.jsx")
    return await apiClient.fetchActivity(user.id)
    }


  
  return (
    <ActivityContext.Provider value={{  activity, setActivity,
                                    initialized, setInitialized,
                                    isLoading, setIsLoading,
                                    error, setError}}>
      {children}
    </ActivityContext.Provider>
  );
};


export const useActivityContext = () => {
    return React.useContext(ActivityContext);
}