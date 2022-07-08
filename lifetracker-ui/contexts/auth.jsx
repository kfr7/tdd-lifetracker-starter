import * as React from "react"
import ApiClient from "../services/apiClient"
// const { API_BASE_URL } = require("../constants")
import API_BASE_URL from "../constants"

const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {
    const [userHasUpdated, setUserHasUpdated] = React.useState(false)
    const [refresh, setRefresh] = React.useState(false)
    const [user, setUser] = React.useState(null)
    const [initialized, setInitialized] = React.useState(false)
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [error, setError] = React.useState(null)

    const apiClient = new ApiClient(API_BASE_URL)
    

    React.useEffect(() => {
        console.log("USING EFFECT")
        const fetchUser = async () => {

        let tokenForUser = null
        let tempUser = null
        try {
            tokenForUser = window.localStorage.getItem("lifetracker_token")
            console.log("TOKEN:", tokenForUser)
            if (tokenForUser !== null)
            {
                apiClient.setToken(tokenForUser)
                setIsProcessing(true)
                setError(null)
                tempUser = await fetchUserFromToken()
                setUser(tempUser)
                setError(null)
            }
        }
        catch (error)
        {
            setError(error.message)
            console.error(error.message)
        }

        setIsProcessing(false)
        setInitialized(true)
    };

    fetchUser();
  }, [userHasUpdated]);

  const loginUser = async (userParameter) => {
    return await apiClient.login(userParameter)
    }

    const signupUser = async (userParameter) => {
        return await apiClient.signup(userParameter)
    }

    const fetchUserFromToken = async () => {
        return await (apiClient.fetchUserFromToken())
    }

    const logoutUser = () => {
        window.localStorage.removeItem("lifetracker_token")
        setUser(null)
        // location.replace("http://localhost:3000")
    }

    
  
  return (
    <AuthContext.Provider value={{  user, setUser,
                                    initialized, setInitialized,
                                    isProcessing, setIsProcessing,
                                    error, setError,
                                    loginUser,
                                    signupUser,
                                    fetchUserFromToken,
                                    logoutUser,
                                    refresh, setRefresh,
                                    userHasUpdated, setUserHasUpdated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
    return React.useContext(AuthContext);
}