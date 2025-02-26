const routes = require('express').Router()
const roleControllers = require('../controllers/RoleControllers')

routes.get("/roles",roleControllers.getUserRole)
routes.post("/role",roleControllers.addRole)
routes.delete("/role/:id",roleControllers.deleteRole)
routes.get("/role/:id",roleControllers.getRoleId)

module.exports = routes