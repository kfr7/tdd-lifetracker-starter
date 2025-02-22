import axios from "axios"
// const { API_BASE_URL } = require("../constants")
import API_BASE_URL from "../constants"

export default class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    setToken(token) {
        this.token = token
    }


    // async request({endpoint, method="GET", data={}}) {
    //     console.log("The data is:", data)

    //     const wholeUrl = `${this.remoteHostUrl}/${endpoint}`
    //     const headers = {
    //         "Content-Type": "application/json"
    //     }
    //     if (this.token) {
    //         headers["Authorization"] = `Bearer ${this.token}`
    //     }

    //     if (data.hasOwnProperty("user_id"))
    //     {
    //         console.log(data)
    //         headers["user-id"] = data.user_id
    //     }

    //     try {
    //         const res = await axios({ "url": wholeUrl, method, data, headers })

    //         if (endpoint === "auth/login") {
    //             window.localStorage.removeItem("lifetracker_token")
    //             window.localStorage.setItem("lifetracker_token", res.data.token)
    //         }
    //         else if (endpoint === "auth/register") {
    //             this.request({ endpoint: "auth/login", method: 'POST', data: data })
    //         }

    //         return res.data
    //     }
    //     catch (error) {
    //         if (endpoint === "auth/login") {
    //             window.localStorage.removeItem("lifetracker_token")
    //         }
            
    //         console.error({ errorResponse: error.response })
    //         const message = error?.response?.data?.error?.message
    //         return message || String(error)
    //     }

    // }
    
    async request(endpoint, information) {
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
                // this.login({"email": information.email, "password": information.password})
                return await this.request("login", {"email": information.email, "password": information.password})
                // return res.data
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
        else if (endpoint === "activity")
        {
            try{
                console.log("4. entered try in activity condition")
                const res = await axios.get(`${API_BASE_URL}/activity`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authentication': `Bearer ${this.token}`,
                                'user-id': information
                            }
                        })
                console.log("5", res.data)
                return res.data
            }
            catch(err)
            {
                console.error(err.message)
                return err
            }
        }
        else if (endpoint === "nutrition/:nutritionId") {
            console.log("ENTERED THE NUTRITION ID GETTING CALL")
            let nutritionId = information
            try{
                const res = await axios.get(`${API_BASE_URL}/nutrition/${nutritionId}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authentication': `Bearer ${this.token}`,
                            }
                        })
                return res.data
            }
            catch(err)
            {
                console.error(err.message)
                return err
            }
        }
        else if (endpoint === "activity/overview") {
            try{
                const res = await axios.get(`${API_BASE_URL}/activity/overview`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authentication': `Bearer ${this.token}`,
                                'user-id': information
                            }
                        })
                console.log("THE RESPONSE OF res.data.overview..", res.data.overview)
                return res.data
            }
            catch(err)
            {
                console.error(err.message)
                return err
            }
        }
    }

    async login(user) {
        // user have keys called email and password
        return await this.request("login", user)
        // return await this.request({ endpoint: "auth/login", method: 'POST', data: user })
    }

    async signup(user) {
        // user have keys called email, password, username, fname, lname
        return await this.request("register", user)
        // return await this.request({ endpoint: "auth/register", method: 'POST', data: user })
    }

    async fetchUserFromToken() {
        // token is stored inside of this.token
        return await (this.request("me", this.token))
        // return await (this.request({ endpoint: 'auth/me', method: 'GET' }))
    }

    async postNutritionItem(nutritionItem, user_id) {
        // return await this.request({ endpoint: "nutrition", method: 'POST', data: {"name": nutritionItem.name,
        //                                                                                         "category": nutritionItem.category,
        //                                                                                         "calories": nutritionItem.calories,
        //                                                                                         "quantity": nutritionItem.quantity,
        //                                                                                         "image_url": nutritionItem.imageUrl,
        //                                                                                         "user_id": user_id
        //                                                                                         }})
        return await (this.request("nutrition_post", {"name": nutritionItem.name,
                                                    "category": nutritionItem.category,
                                                    "calories": nutritionItem.calories,
                                                    "quantity": nutritionItem.quantity,
                                                    "image_url": nutritionItem.imageUrl,
                                                    "user_id": user_id
                                                     }))
    }

    // SPECIAL CASE
    async getNutritions(user_id) {
        // return await this.request({ endpoint: "nutrition", method: 'GET', data: {user_id}})
        return await (this.request("nutrition_get", user_id))
    }

    async fetchActivity(user_id) {
        // return await this.request({ endpoint: "activity", method: 'GET', data:{user_id}})
        // console.log("3. Entered fetch activity in apiClient")
        return await (this.request("activity", user_id))
    }

    async getNutritionById(nutritionId) {
        // return await this.request({ endpoint: `nutrition/${nutritionId}`, method: 'GET', data:{user_id}})
        return await (this.request(`nutrition/:nutritionId`, nutritionId))
    }

    async getActivitySummaryStats(user_id) {
        // return await this.request({ endpoint: "activity/overview", method: 'GET', data: {user_id}})
        return await (this.request("activity/overview", user_id))
    }

}