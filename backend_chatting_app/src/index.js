import dotenv from "dotenv"
import connectDB from "./database-connect/index.js";
import { app } from "./app.js";
import { server } from "./utils/Socketio.js";
dotenv.config({
    path: './.env'
})

//Approach 1: Chained .then().catch() Promise Style
//here we import the connect db
const database= connectDB()

database.then(()=>{


    server.listen(process.env.PORT || 8005,()=>{
          console.log(`server is running at ${process.env.PORT}`)
    })
    server.on("error",(error)=>{
        console.log(`getting error`,error);
        throw error
    })
})
.catch((error)=>{
    console.log("Mongodb connection failed !! ",error)
    process.exit(1)
})