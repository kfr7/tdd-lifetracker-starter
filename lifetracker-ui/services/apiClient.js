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

    async request(endpoint, information) {
        let user = null;
        if (endpoint === "login")
        {
            try{
                const res = await axios.post(`${API_BASE_URL}/auth/${endpoint}`,
                information, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                window.localStorage.removeItem("lifetracker_token")
                window.localStorage.setItem("lifetracker_token", res.data.token)
                return res.data
            }
            catch(err)
            {
                window.localStorage.removeItem("lifetracker_token")
                console.log("ENTERED THE ERROR")
                return err
            }
        }
        else if (endpoint === "register")
        {
            try{
                const res = await axios.post(`${API_BASE_URL}/auth/${endpoint}`,
                information, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                this.login({"email": information.email, "password": information.password})
                return res.data
            }
            catch(err)
            {
                console.log("ENTERED THE ERROR")
                return err
            }
        }
        else if (endpoint === "me")
        {

            try{
                const res = await axios.get(`${API_BASE_URL}/auth/${endpoint}`,
                        { headers: {
                                        'Content-Type': 'application/json',
                                        'Authentication': `Bearer ${information}`
                                    }})
                console.log("ABOUT TO RETURN IN /me", res.data)
                return res.data
            }
            catch(err)
            {
                console.log("ENTERED THE ERROR")
                return err
            }

        }
        else if (endpoint === "nutrition_post")
        {
            try{
                const res = await axios.post(`${API_BASE_URL}/nutrition`,
                // information has name, quantity, image_url, category, calories, user_id
                information, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authentication': `Bearer ${this.token}`
                            }
                        })
                return res.data
            }
            catch(err)
            {
                console.log("ENTERED THE ERROR for posting")
                return err
            }
        }
        else if (endpoint === "nutrition_get")
        {
            try{
                const res = await axios.get(`${API_BASE_URL}/nutrition`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authentication': `Bearer ${this.token}`,
                                'user-id': information
                            }
                        })
                return res.data
            }
            catch(err)
            {
                console.log("ENTERED THE ERROR for posting")
                console.error(err.message)
                return err
            }
        }
    }

    async login(user) {
        // user have keys called email and password
        return await this.request("login", user)
    }

    async signup(user) {
        // user have keys called email, password, username, fname, lname
        return await this.request("register", user)
    }

    async fetchUserFromToken() {
        // token is stored inside of this.token
        return await (this.request("me", this.token))
    }

    async postNutritionItem(nutritionItem, user_id) {
        return await (this.request("nutrition_post", {"name": nutritionItem.name,
                                                    "category": nutritionItem.category,
                                                    "calories": nutritionItem.calories,
                                                    "quantity": nutritionItem.quantity,
                                                    "image_url": nutritionItem.imageUrl,
                                                    "user_id": user_id
                                                     }))
    }

    async getNutritions(user_id) {
        console.log("inside getNutritions we have 'user id'...", user_id)
        return await (this.request("nutrition_get", user_id))
    }

}