const routes = require('express').Router()
const resumeControllers = require('../controllers/ResumeControllers')

routes.post("/resume/save",resumeControllers.addResume)
routes.get("/resume/:id",resumeControllers.getIdByResume)

module.exports = routes