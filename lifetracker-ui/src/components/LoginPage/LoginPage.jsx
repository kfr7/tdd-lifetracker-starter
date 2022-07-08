import "./LoginPage.css"
import * as React from "react"
import LoginForm from "../LoginForm/LoginForm"
import { useNavigate } from "react-router-dom"



export default function LoginPage( { } ) {
  const [redirect, setRedirect] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (redirect)
    {
      navigate("/activity/overview")
    }
    }, [redirect]);

  return (
    <>
      <div className="login-page">
        <h3 id="login-header">
          Login
        </h3>
        <LoginForm redirect={redirect} setRedirect={setRedirect} />
      </div>
    </>
  )
}