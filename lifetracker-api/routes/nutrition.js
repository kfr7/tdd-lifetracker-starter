const express = require("express")
const Nutrition = require("../models/nutrition")
const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const nutrition = await Nutrition.createNutrition(req.body)
        res.status(200).json({nutrition})
    }
    catch(error) {
        next(error)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const user_id = req.headers['user-id']
        if (user_id == null) 
        {
            throw new BadRequestError("No header passed when trying to access information regarding user")
        }
        const nutritionArray = await Nutrition.listNutritionForUser(user_id)
        res.status(200).json({"nutritions": nutritionArray})
    }
    catch(error) {
        next(error)
    }
})

router.get("/:nutritionId", async (req, res, next) => {
    try {
      const nutritionId = req.params.nutritionId
      const nutrition = await Nutrition.getNutritionById(nutritionId)
      if (!nutrition) {
        throw new NotFoundError(`Nutrition with ID... ${nutritionId} not found`)
      }
      res.status(200).json({ nutrition })
    } catch (err) {
      next(err)
    }
  })

module.exports = router