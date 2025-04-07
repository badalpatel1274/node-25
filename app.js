const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const path =require('path')
const PORT = 5000
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect("mongodb://127.0.0.1:27017/node-25").then(()=>{
    console.log("database connected...")
})


//  role routes
const roleRoutes = require('./src/routes/RoleRoutes')
app.use(roleRoutes)


// user route
const userRoutes = require('./src/routes/UserRoutes')
app.use(userRoutes)

    
// template route
const templateRoutes = require('./src/routes/TemplateRoutes')
app.use('/template',templateRoutes)

//forms route

const formRoutes = require('./src/routes/FormRoutes')
app.use('/form',formRoutes)

//RESUMEROUTE
const resumeRoutes = require('./src/routes/ResumeRoutes')
app.use(resumeRoutes)

//activity
const activityRoutes = require('./src/routes/ActivityRoutes')
app.use(activityRoutes)

app.listen(PORT , ()=>{
    console.log(`server is started on localhost:${PORT}`)
})

