import { User } from "../model/user_model.js";
import mongoose from "mongoose";
import { asynchandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOncloudinary,deleteOnCloudinaryImage} from "../utils/uploadOnCloudinary.js";

const generateToken = async(user)=>{
   const AccessToken = await user.generateAccessToken(); // ✅ Correct
const RefreshToken = await user.generateRefreshToken(); // ✅ Correct


    user.refreshToken = RefreshToken

    await user.save({ validateBeforeSave: false });

    return {RefreshToken,AccessToken}
}

const sign_up = asynchandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  if (!email || !fullname || !username || !password) {
    throw new ApiError(400, "All user details are required.");
  }

  
    // Check if email already exists
    const emailexist = await User.findOne({ email });
    if (emailexist) {
      throw new ApiError(409, "User with this email already exists.");
    }

    // Check if username already exists
    const usernameexist = await User.findOne({ username });
    if (usernameexist) {
      throw new ApiError(409, "Username is already taken.");
    }

    // Create new user
    const newUser = await User.create({
      fullname,
      email,
      password,
      profilepic:null,
      username: username.toLowerCase(),
    });

    if (!newUser) {
      throw new ApiError(500, "Failed to create user.");
    }

    // Select user data to return (exclude password & tokens)
    const userToReturn = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );

    // Generate tokens
    const { RefreshToken, AccessToken } = await generateToken(newUser);

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use `secure` only in production
      sameSite: "Strict",
    };

    // Send cookies and response
    return res
      .status(201)
      .cookie("accessToken", AccessToken, options)
      .cookie("refreshToken", RefreshToken, options)
      .json(new ApiResponse(201, userToReturn, "User signed up successfully."));

  
});


const login = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(404, "Password or email is missing");
  }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User with this email not exist");
    }

    const ispasswordcorrect = await user.isPasswordCorrect(password);

    if (!ispasswordcorrect) {
      throw new ApiError(404, "Incorrect password]");
    }

    const { RefreshToken, AccessToken } = await generateToken(user);

    if (!AccessToken?.trim() || !RefreshToken?.trim()) {
      throw new ApiError(401, "Access Token or Refresh Token is missing or empty.");
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true
    };

    return res
      .status(200)
      .cookie("accessToken", AccessToken, options)
      .cookie("refreshToken", RefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            AccessToken,
            RefreshToken
          },
          "User logged in successfully"
        )
      );

  } 
);

const updatePassword = asynchandler(async(req,res,next)=>{
  const {newPassword,oldPassword} = req.body
  //console.log(newPassword,oldPassword)
  const user = req.user
if(!user){
  throw new ApiError(404,"session out")
}
//console.log(user)

  if(!newPassword || !oldPassword){
    throw new ApiError(404,"password is required")
  }

  if(newPassword == oldPassword){
    throw new ApiError(404,"password must be different from old password")
  }

  try{
  const verifypassword = await user.isPasswordCorrect(oldPassword)
console.log(verifypassword)
    if(!verifypassword){
      throw new ApiError(404,"password is not corrrect")
    }
console.log(user.password)
    user.password = newPassword;

    await user.save({validateBeforeSave:false})
console.log(user.password)

 return res.status(200)
     .json(new ApiResponse(200,"password change successfully"))
  }catch(error){

  }

})
const logoutUser = asynchandler(async (req, res) => {
      
         await  User.findByIdAndUpdate(
            req.user._id, 
            {
              $unset: {
                refreshToken: 1 //this remove field from databse
              }
            },
            {
              new: true, // to get updated new value with a refresh token as undefined otherqise we will get same value of refresh token
            }
          ) 
          //  -clear cookies
          const options = {
            httpOnly: true,
            secure: true,
          }
          //  console.log(req.user, "LOG OUT")
          return res
          .status(200)
          .clearCookie("refreshToken", options)
          .clearCookie("accessToken", options)
          .json(
    new ApiResponse(
        200,
        "user logged out Successfully"
    )
)
  })

const updateprofilepic = asynchandler(async (req, res, next) => {
 
    const profilepic_path = req?.file?.path;
    console.log(profilepic_path)
    if (!profilepic_path) {
      throw new ApiError(404, "No profile pic path fetched");
    }

    const profilepic_url = await uploadOncloudinary(profilepic_path);
    console.log(profilepic_url)
    if (!profilepic_url) {
      throw new ApiError(404, "URL not fetched for profile pic");
    }

    const existingUser = await User.findById(req.user?._id);
   console.log(existingUser)
    if (existingUser) {
      await deleteOnCloudinaryImage(existingUser.profilepic);
    }

    const updateduser= await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          profilepic: profilepic_url,
        },
      },
      {
        new: true,
      }
    );

 

    return res
      .status(200)
      .json(new ApiResponse(200, updateduser, "User profile picture updated successfully"));
 
});

const checkAuth = asynchandler(async(req,res,next)=>{
  try {
    const userId = req.user._id

    const user = await User.findById( userId ).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200,user))
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    throw new ApiError(500,"internal server error")
  } 
})

export {
    sign_up,login,updatePassword,logoutUser,updateprofilepic,checkAuth
}