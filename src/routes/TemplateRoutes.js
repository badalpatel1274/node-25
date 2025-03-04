const route =require('express').Router()
const templateController = require('../controllers/TemplateControllers')

route.post("/addtemplate",templateController.addTemplate)
route.get("/alltemplate",templateController.getAllTemplate)

module.exports = route