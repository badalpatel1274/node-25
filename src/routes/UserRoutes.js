const route =  require('express').Router()
const userConroller = require('../controllers/UserControllers')

route.post("/user",userConroller.addUser)
route.get("/user",userConroller.getUser)
route.delete("/user/:id",userConroller.deleteUser)
route.get("/user/:id",userConroller.getUserId)


module.exports = route