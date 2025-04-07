const routes= require('express').Router()
const activityConrollers = require('../controllers/ActivityControllers')

routes.get("/recentActivity",activityConrollers.getRecentActivity)

module.exports = routes