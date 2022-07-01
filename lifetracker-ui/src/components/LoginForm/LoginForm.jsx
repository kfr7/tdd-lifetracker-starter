import "./LoginForm.css"
import * as React from "react"
import { useAuthContext } from  "../../../contexts/auth"

export default function LoginForm( { redirect, setRedirect } ) {

    const { error, loginUser, refresh, setRefresh } = useAuthContext()

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
        if (loginForm.email.indexOf("@") <= 0) 
            {
                console.log("Invalid email")
                return
            // setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
            }
        else {
            console.log("email fine",loginForm.email.indexOf("@") )
        }
        
        console.log("same call--------")
        try {
            
            loginUser(loginForm)
            if (refresh) {setRefresh(false)} 
            else {setRefresh(true)}
            setRedirect(true)
        }
        catch (error) {
            if (refresh) {setRefresh(false)} 
            else {setRefresh(true)}
            setRedirect(false)
        }

        console.log("same call--------")


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
            <button className="submit-login" onClick={handleOnSubmit}>Login</button>
        </div>
    )
}