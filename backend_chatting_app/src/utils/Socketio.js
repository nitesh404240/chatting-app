import {Server} from "socket.io"
import http from "http"
import express from "express"
import cors from "cors"
const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors : {
        origin : ["http://localhost:5173"],
    }
});
//message
export function getRecieverSockeId(userId){
    return userSocketMap[userId]
}
//used to store the online users
const userSocketMap = {}   //{userId : socketId}
//in this userid coming from database and socketid is given when user connected
io.on("connection",(socket)=>{
   console.log("a user connected",socket.id)

 const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

   socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
   })
})
export {io,app,server}