const route =  require('express').Router()
const userConroller = require('../controllers/UserControllers')

route.post("/user",userConroller.addUser)
route.get("/user",userConroller.getUser)
route.delete("/user/:id",userConroller.deleteUser)
route.get("/user/:id",userConroller.getUserId)
route.post("/signup",userConroller.signUp)
route.post("/login",userConroller.loginUser )
route.post("/forgetpassword",userConroller.forgetPassword)
route.post("/resetpassword",userConroller.resetPassword)


module.exports = route