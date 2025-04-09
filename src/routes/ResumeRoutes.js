const routes = require('express').Router()
const resumeControllers = require('../controllers/ResumeControllers')

routes.post("/resume/save",resumeControllers.addResume)
routes.get("/resume/:id",resumeControllers.getIdByResume)
routes.get("/allresume",resumeControllers.totalResume)
routes.get('/templateUsage',resumeControllers.getTemplateUsageStats)
routes.get("/resumes/user/:userId", resumeControllers.getResumesByUser);


module.exports = routes