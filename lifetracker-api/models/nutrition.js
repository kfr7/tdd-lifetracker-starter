const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")




class Nutrition {

    static async createNutrition(information) {

        if (!information)
        {
            throw new BadRequestError("No object passed through to add to nutrition table.")
        }

        const requiredFields = ["name", "category", "calories", "image_url", "quantity", "user_id"]

        requiredFields.forEach((field) => {
            if (!information.hasOwnProperty(field))
            {
                throw new BadRequestError(`The field: "${field}" is missing from the object passed in to add a nutrition`)
            }
        })
        
        const text = 
        `INSERT INTO nutrition (
            name, 
            category,
            calories,
            image_url,
            quantity,
            user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, category, calories, image_url, quantity, user_id`;
        const values = [information.name,
                        information.category,
                        information.calories,
                        information.image_url,
                        information.quantity,
                        information.user_id]
        
        const result = await db.query(text, values);   
        return result.rows[0]
    }
    
    static async fetchNutritionById(id) {
        if (!id)
        {
            throw new BadRequestError("No id passed through");
        }
        const text = `SELECT * FROM nutrition WHERE id=$1`;
        const values = [id];
        const result = await db.query(text, values);
        return result.rows[0];  // this is the user with that email
    }

    static async listNutritionForUser(user_id) {
        if (!user_id)
        {
            throw new BadRequestError("No user_id passed through");
        }
        const text = `SELECT * FROM nutrition WHERE user_id=$1`;
        const values = [user_id];
        const result = await db.query(text, values);
        return result.rows;  // this is the array of all the rows
    }
}


module.exports = Nutrition