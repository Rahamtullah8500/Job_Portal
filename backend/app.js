import express, { json, urlencoded } from 'express'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import userRouter from './routers/userRouter.js';
import applicationRouter from './routers/applicationRouter.js';
import jobRouter from './routers/jobRouter.js';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express()

dotenv.config({path:'./config/config.env'})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['POST','GET',"PUT","DELETE"],
    credentials:true,
}))

app.post('/register',(req,res)=>{
    console.log(res.data)
})

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))


app.use('/api/v1/user', userRouter)
app.use('api/v1/applicaiton', applicationRouter)
app.use('api/v1/jobs', jobRouter)

dbConnection();

app.use(errorMiddleware)

export default app;