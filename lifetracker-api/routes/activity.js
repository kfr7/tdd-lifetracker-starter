const express = require("express")
const Activity = require("../models/activity")
const router = express.Router()


router.get("/", async (req, res, next) => {
    try {
        const user_id = req.headers['user-id']
        if (user_id == null) 
        {
            throw new BadRequestError("No header passed when trying to access information regarding user")
        }
        const perDay = await Activity.calculateDailyCaloriesSummaryStats(user_id)
        const perCategory = await Activity.calculatePerCategoryCaloriesSummaryStats(user_id)
        res.status(200).json({"nutrition": { "calories": { "perDay": perDay, "perCategory": perCategory } } })
    }
    catch(error) {
        next(error)
    }
})

module.exports = router