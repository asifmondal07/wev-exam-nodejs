import express from 'express'
import { handelLogin, handelUserCreate } from '../contollers/userController.js'
import multer from 'multer'

const userRouter=express.Router()
const upload=multer()

userRouter.post('/create',upload.none(),handelUserCreate)
userRouter.post('/login',upload.none(),handelLogin)


export default userRouter