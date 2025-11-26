import expresss from'express'
import config from './config.js'

import dbConnect from './src/connection/connect.js'
import taskRouter from './src/routes/taskRoute.js'
import userRouter from './src/routes/userRoute.js'

const app=expresss()
const port=config.port

dbConnect(config.mongoUrl)


app.use(expresss.json())
app.use(expresss.urlencoded({extended:true}))
app.use("/user",userRouter)
app.use("/task",taskRouter)

app.listen(port,()=>console.log("Server Started ",port))