const EventEmitter = require('events')
const activityModels = require("../models/ActivityModels")

const logger = new EventEmitter()

logger.on("activity", async({message , user})=>{
    try {
        await activityModels.create({message , user})
    } catch (error) {
        console.error("Logging Error:",error)
    }
})

module.exports = logger