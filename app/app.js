const express = require("express")
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter")

const app = express()

//Middlewares
app.use(morgan("dev"))
app.use(express.json()) //pass input json data

//Routes


//Admin register
app.use("/api/v1/admin", adminRouter)


module.exports = app