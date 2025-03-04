const route = require("express").Router();

const formController = require('../controllers/FormsControllers')

route.post("/addinfo", formController.addFormDetails)

route.get("/allinfo", formController.getAllFormDetails)

module.exports = route