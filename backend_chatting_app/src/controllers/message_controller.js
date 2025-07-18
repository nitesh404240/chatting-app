import { Message } from "../model/message_model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user_model.js";
import { asynchandler } from "../utils/AsyncHandler.js";
import { uploadOncloudinary } from "../utils/uploadOnCloudinary.js";
import { getRecieverSockeId,io } from "../utils/Socketio.js";

const getUserForSidebar = asynchandler(async(req,res,next)=>{
try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(new ApiResponse(200,"user fetched successfully",filteredUsers));
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    throw new ApiError(500,"internal server error")
  }
})

const getMessages = asynchandler(async(req,res,next)=>{
  try {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;
//it will help to i find the message for both i send the message or other persons send the message
const messages = await Message.find({
  $or: [
    { senderId: myId, receiverId: userToChatId },  
    { senderId: userToChatId, receiverId: myId },  
  ],
})
  .sort({ createdAt: 1 })
  .select("senderId receiverId text image createdAt");
  res.status(200).json(new ApiResponse(200,messages,"messages fetched succesfully"));
} catch (error) {
  console.error("Error in getMessages controller:", error.message);
  throw new ApiError(500,"internal server error")
}

})

const sendMessage = asynchandler(async(req,res,next)=>{
   try {
     const {id:receiverId} = req.params
     const {text} = req.body
      const image = req?.file?.path;
     const senderId = req.user._id

     //console.log(text,image)

     let imageUrl ;
     if(image){
      imageUrl = await uploadOncloudinary(image)
     }
   ////console.log(text,image)
     const newMessage = await Message.create({
      senderId,
      receiverId: receiverId,
      text,
      image : imageUrl
     })
     
//in sending message we will giving real time functionalities 
const recieverSocketId = getRecieverSockeId(receiverId);
if(receiverId){
  //this is one on one chat so we need to implement the io.to(recieverId)
  //  bcz io.emit() used to send the query all over the users
  io.to(recieverSocketId).emit("newMessage",newMessage);
}

return res.status(200).json(new ApiResponse(200,newMessage,"message send successfully"))

   } catch (error) {
    throw new ApiError(500,"intenal server error")
   }
})
export {getUserForSidebar,getMessages,sendMessage}