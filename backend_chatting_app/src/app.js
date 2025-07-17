import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,io,server } from "./utils/Socketio.js";
// const app = express();


app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json({ limit: "16kb"}));
app.use(express.urlencoded({ extended: true,limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user_routes.js"
import messageRouter from"./routes/message_routes.js"

app.use("/api/users",userRouter)
app.use("/api/message",messageRouter)

export {app}