const route = require("express").Router();

const formController = require('../controllers/FormsControllers')

route.post("/addinfo",formController.addFormDetails)

route.get("/allinfo", formController.getAllFormDetails)

route.put("/updateForm/:id", formController.updateForms)

route.get("/getbyidform/:id", formController.getFormsById)

module.exports = route