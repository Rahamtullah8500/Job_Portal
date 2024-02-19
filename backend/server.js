import app from "./app.js";

app.listen(process.env.PORT,()=>{
    console.log(`server is started at ${process.env.PORT}`)
})