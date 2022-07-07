import "./App.css"
import * as React from "react"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import AccessForbidden from "../AccessForbidden/AccessForbidden"
import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from "../NotFound/NotFound"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AuthContextProvider } from "../../../contexts/auth"
import { useAuthContext } from  "../../../contexts/auth"

import { NutritionContextProvider} from "../../../contexts/nutrition"

import { ActivityContextProvider } from "../../../contexts/activity"



export default function AppContainer(props) {


  return (
    <AuthContextProvider>
      <NutritionContextProvider>
        <ActivityContextProvider>
          <App />
        </ActivityContextProvider>
      </NutritionContextProvider>
    </AuthContextProvider>
  )
}


function App(props) {
  const { user } = useAuthContext()
  const [isLoggedIn, setIsLoggedIn] = React.useState(true)


  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/activity" element={ user!==null ? <ActivityPage /> : <AccessForbidden />} />
            <Route path="/nutrition/*" element={ user!==null ? <NutritionPage /> : <AccessForbidden />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>      
      </React.Fragment>
    </div>
  )
}
