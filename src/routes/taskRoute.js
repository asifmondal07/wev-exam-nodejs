import express from 'express'

import multer from 'multer'
import requiredAuth from '../middilware/auth.js'
import { handelDeleteTask, handelGetAllTask, handelTaskCreate } from '../contollers/taskController.js'

const taskRouter=express.Router()
const upload=multer()


taskRouter.post("/create",upload.none(),requiredAuth,handelTaskCreate)
taskRouter.get("/getall",upload.none(),requiredAuth,handelGetAllTask)
taskRouter.delete("/:taskId",requiredAuth,handelDeleteTask );



export default taskRouter