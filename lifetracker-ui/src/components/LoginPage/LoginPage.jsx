import "./LoginPage.css"
import * as React from "react"
import LoginForm from "../LoginForm/LoginForm"
import { useNavigate } from "react-router-dom"


export default function LoginPage( { isLoggedIn, setIsLoggedIn } ) {
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isLoggedIn)
    {
      navigate("/activity")
    }
    }, [isLoggedIn]);

  return (
    <>
      <div className="login-page">
        <h3>
          Log In...
        </h3>
        <LoginForm isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}/>
        {/* { isLoggedIn ?
          navigate("/activity")
        :
          <LoginForm isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}/>
        } */}
      </div>
    </>
  )
}