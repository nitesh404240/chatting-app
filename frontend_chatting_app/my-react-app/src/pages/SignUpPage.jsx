import React from 'react'
import SettingsPage from './SettingsPage'
import { useState } from 'react'
import { Link ,Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User} from "lucide-react"
import toast from 'react-hot-toast'
import { useEffect } from 'react'
const SignUpPage = () => {
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData] = useState({
    fullname : "",
    email : "",
    password : "",
    username :""
  })

  const {signup , isSigningUp ,authUser} = useAuthStore()

  

  const validateForm = () =>{
     if (!formData.fullname.trim()) return toast.error("Full name is required");
      if (!formData.username.trim()) return toast.error("username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }
  const handelSubmit = (e)=>{

    e.preventDefault() //preventing the reload\
    const success = validateForm()
    if(success === true ) signup(formData)
    
  };
  return (
    <div className='min-h-screen  w-full flex flex-col justify-center pl-20 pr-20 pt-10'>
     
       {/*left side*/}
       <div className='flex flex-col w-auto justify-center items-center p-6  sm:p-12'>
      
        <div className='w-full max-w-md space-y-8'>
        
          {/*logo*/}
          <div className='="text-center mb-8'>
          
            <div className='flex flex-col  items-center gap-2 group'>
              <div className='size-12  rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors' >
               <MessageSquare className ="size-6 text-primary"/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get started with your free account</p>
            </div>
          </div>
          <form onSubmit={handelSubmit} className='space-y-6'>
             <div className='form-control'>
              <label className="label mb-1">
                <label className="label-text font-medium">Full Name</label>
              </label>     
              <div className='relative'>
               
                <input  
                        className={`input input-bordered w-full pl-10  bg-transparent`}
                      type="text" 
                        placeholder="John Doe" 
                       value={formData.fullname}
                        onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                      />
                       <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className="size-5 text-base-content/40"/>
                </div>
                </div>         
             </div>

             <div className='form-control'>
              <label className="label mb-1">
                <label className="label-text font-medium">Email</label>
              </label>     
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className="size-5 text-base-content/40" />
                </div>
                <input  
                        className={`input input-bordered w-full pl-10 bg-transparent`}
                      type="text" 
                        placeholder="Jxyz@gmail.com" 
                       value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                       
                </div>         
             </div>

             <div className='form-control'>
              <label className="label mb-1">
                <label className="label-text font-medium">username</label>
              </label>     
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className="size-5 text-base-content/40" />
                </div>
                <input  
                        className={"input input-bordered w-full pl-10 bg-transparent"}
                      type="text" 
                        placeholder="John Doe" 
                       value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      />
                      
                </div>         
             </div>

             <div className='form-control'>
              <label className="label mb-1">
                <label className="label-text font-medium">Password</label>
              </label>     
              <div className='relative'>
               <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className="size-5 text-base-content/40 " />
                </div>
                <input  
                        className={`input input-bordered w-full pl-10 bg-transparent`}
                        type={showPassword ? "text":"password"} 
                        placeholder="* * * * * * * *" 
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                     <button 
                     type = "button"
                     className='absolute inset-y-0 right-0 pr-3 flex items-center'
                     onClick={()=>{setShowPassword(!showPassword)}}>
                        { showPassword? (<Eye className='size-5 text-base-content/40'/>):( <EyeOff className='size-5 text-base-content/40'/>)}
                      </button>  
                </div>         
             </div>


              <button type='submit' className="btn btn-primary w-full" disabled = {isSigningUp}>
                  {isSigningUp ? (
                    <> <Loader2 className="size-5 animate-spin"/>"loading..."</>
                  ):("Create account")}
              </button>
             
          </form>
            <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
          
        </div>
       </div>
    </div>
  )
}

export default SignUpPage
