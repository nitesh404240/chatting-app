import { create } from "zustand"
import {axiosInstance} from "/src/lib/axios.js"
import {toast} from "react-hot-toast"
import { data } from "react-router-dom"
export const useAuthStore = create( (set) => ({
    authUser: null,
    //it is initally null because we dont know whether user authenticated or not
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfilepic: false,
    isUpdatingPassword: false,
    isCheckingAuth: true,

      setLoginEmailError: (message) => set({ loginEmailError: message }),
      setLoginPasswordError: (message) => set({ loginPasswordError: message }),
      clearLoginErrors: () => set({ loginEmailError: "", loginPasswordError: "" }),
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/api/users/check")
            set({
                authUser: res.data
            })
        } catch (error) {
            console.log("error in checkAuth:", error)
            set({
                authUser: null
            })
        } finally {
            set({
                isCheckingAuth: false
            })
        }

    },
    signup : async(data)=>{
         set({isSigningUp:true})
           try {
            const res = await axiosInstance.post("/api/users/signup",data,{withCredentials : true})
            set({authUser : res.data})
             toast.success("Account created successfully")
           } catch (error) {
             
              toast.error(  error?.response?.data?.message || "Signup failed. Please try again.")
           }finally{
                   set({isSigningUp:false})
           }
    },

    logout : async()=>{
        try {
            
            const res = await axiosInstance.post("/api/users/logout",{withCredentials : true})
            set({authUser:null})
            toast.success("user logout successfully")
        } catch (error) {


            toast.error(  error?.message || "logout failed. Please try again.")
        }
    },

    login : async(data)=>{
         set({isLoggingIn:true})
           try {
            const res = await axiosInstance.post("/api/users/login",data)
            set({authUser : res.data})
             toast.success(`logged in successfully`)
           } catch (error) {
            const message =  error?.res?.data?.message
             if(message?.toLowerCase().includes("email")){
                setLoginEmailError("email not exist")
             }
              if(message?.toLowerCase().includes("password")){
                setLoginPasswordError("password not exist")
             }
              toast.error(error.data?.message || "login failed. Please try again.")
           }finally{
                   set({isLoggingIn:false})
           }
    }
     ,
    updatingprofilepic:async(data)=>{
           set({isUpdatingProfilepic : true})
           try {
              const res = await axiosInstance.put("/api/users/updateprofilepic", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
              set({authUser: res.data})
              toast.success(`${res.data.data.fullname}'s profilepic updated successfully`)
           } catch (error) {
               toast.error(error.data?.message || "updating failed. Please try again.")
           }finally{
               set({isUpdatingProfilepic:false})
           }
    }
}))