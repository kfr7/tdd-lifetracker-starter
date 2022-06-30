import "./LoginForm.css"
import * as React from "react"
import { useAuthContext } from  "../../../contexts/auth"

export default function LoginForm( { isLoggedIn, setIsLoggedIn } ) {

    const { loginUser } = useAuthContext()

    const [loginForm, setLoginForm] = React.useState({
        email: "",
        password: "",
    })

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") <= 0) 
            {
                console.log("Invalid email")
            // setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
            } else 
            {

                console.log("is good, continue")
            // setErrors((e) => ({ ...e, email: null }))
            }
        }
        
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const handleOnSubmit = () => {
        console.log("Entered handleOnSubmit")
        const possibleError = loginUser(loginForm)
        if (possibleError === "")
            {
                setIsLoggedIn(true)
            }
            else
            {
                console.log(possibleError)
            }
    }

    return (
        <div className="login-form">
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <br/>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="user@gmail.com" 
                    value={loginForm.email}
                    onChange={handleOnInputChange}></input>
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <br/>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={loginForm.password}
                    onChange={handleOnInputChange}></input>
            </div>
            <button className="btn" onClick={handleOnSubmit}>Log In</button>
        </div>
    )
}