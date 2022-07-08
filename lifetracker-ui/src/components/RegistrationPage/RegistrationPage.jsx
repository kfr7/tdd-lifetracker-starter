import "./RegistrationPage.css"
import * as React from "react"
import RegistrationForm from "../RegistrationForm/RegistrationForm"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from  "../../../contexts/auth"

// somehow redirect them if already logged in
// not sure whether to use linked or not

export default function RegistrationPage( { } ) {
    const [redirect, setRedirect] = React.useState(false)

    const navigate = useNavigate()

    React.useEffect(() => {
      if (redirect)
      {
        navigate("/activity/overview")
      }
      }, [redirect]);

  return (
        <div className="registration-page">
          <h3>
            Sign Up...
          </h3>
            <RegistrationForm redirect={redirect} setRedirect={setRedirect} />
        </div>
    
  )
}