import mongoose from "mongoose";


export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:'Job_Seeking'
    })
    .then(()=>{
        console.log('Connected to database')
    })
    .catch((err)=>console.log(`Error connecting to the database ${err}`))
}