import axios from "axios"
// const { API_BASE_URL } = require("../constants")
const API_BASE_URL = "http://localhost:3001"

export default class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    setToken(token) {
        this.token = token
    }

    // isLoggedIn() {
    //     return this.token !== null
    // }
    request(endpoint, information) {
        const userAndError = [null, ""];
        if (endpoint === "login")
        {
            console.log("Entered correct condition (login)")
            console.log("The information passed to log in", information)
            axios.post(`${API_BASE_URL}/auth/${endpoint}`,
                information, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                console.log("RESPONSE FROM login", response)
                window.localStorage.setItem("lifetracker_token", response.data.token)
              
                }, reason => {
                // setError(reason);
                userAndError[1] = reason
                console.log(reason);
                })
        }
        else if (endpoint === "register")
        {
            axios.post(`${API_BASE_URL}/auth/${endpoint}`,
                information, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                console.log("RESPONSE FROM register", response)
                this.login({"email": information.email, "password": information.password})

                }, reason => {
                // setError(reason);
                userAndError[1] = reason
                console.log(reason);
                })
        }
        else if (endpoint === "me")
        {
            axios.get(`${API_BASE_URL}/auth/${endpoint}`,
                information, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${information}`
                    }
                })
                .then((response) => {
                console.log("RESPONSE FROM register", response)
                userAndError[0] = response.data.user
                }, reason => {
                // setError(reason);
                userAndError[1] = reason
                console.log(reason);
                })
        }
        return userAndError
    }

    login(user) {
        // user have keys called email and password
        console.log("Entered login in apiClient.js with", user)
        return (this.request("login", user))[1]
    }

    signup(user) {
        // user have keys called email, password, username, fname, lname
        console.log("Entered signup in apiClient.js with", user)
        return (this.request("register", user))[1]
    }

    fetchUserFromToken() {
        // token is stored inside of this.token
        return (this.request("me", this.token))[0]
    }

}

