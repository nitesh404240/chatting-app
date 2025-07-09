import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {MousePointerClick } from "lucide-react"
const HomePage = () => {
  const {authUser} = useAuthStore()
  return (
   <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Box Office News!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <p>{authUser.data.fullname}</p>
      <p>{authUser.data.email}</p>
      <p>{authUser.data.username}</p>
      <p>{authUser.data.createdAt}</p>
      <button className="btn btn-primary">Get Started {<MousePointerClick className="size-5"/>}</button>
    </div>
  </div>
</div>
  )
}

export default HomePage
