const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const Nutrition = require("./nutrition")


class Activity {
    static async calculateDailyCaloriesSummaryStats(user_id) {
        if (!user_id)
        {
            throw new BadRequestError("No user_id passed through");
        }
        const text = `SELECT created_at::date AS "date", SUM(calories*quantity) AS "totalCaloriesPerDay" FROM nutrition WHERE user_id=$1 GROUP BY created_at::date;`;
        const values = [user_id]
        const results = await db.query(text, values)
        return results.rows
    }
    static async calculatePerCategoryCaloriesSummaryStats(user_id) {
        if (!user_id)
        {
            throw new BadRequestError("No user_id passed through");
        }
        const text = `SELECT category, ROUND(AVG(calories*quantity),1) AS "avgCaloriesPerCategory" FROM nutrition WHERE user_id=$1 GROUP BY category;`;
        const values = [user_id]
        const results = await db.query(text, values)
        return results.rows
    }
    
}


module.exports = Activity