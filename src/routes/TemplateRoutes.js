const route =require('express').Router()
const templateController = require('../controllers/TemplateControllers')

route.post("/addtemplate",templateController.addTemplate)
route.get("/alltemplate",templateController.getAllTemplate)
route.delete("/deletetemplate/:id",templateController.deleteTemplate)
route.get("/gettemplate/:id",templateController.getTemplatebyId)

module.exports = route