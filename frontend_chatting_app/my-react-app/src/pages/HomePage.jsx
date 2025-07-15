import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {MousePointerClick } from "lucide-react"
import { usechatstore } from '../store/useChatStore'
import NoChatSelected from '../components/NochatSelected'
import Chatcontainer from '../components/Chatcontainer'
import Sidebar from '../components/Sidebar'
const HomePage = () => {
  const {authUser} = useAuthStore()
  const {selectedUser} = usechatstore()
  return (
        <div className='h-screen bg-base-200'>
            <div className='flex items-center justify-center pt-20 px-4'>
              <div className='bg-base-100 rounded-lg shadow-cl w-full  max-w-4xl h-[calc(100vh-8rem)]'>
                 <div className='flex h-full rounded-lg overflow-hidden'>
                   <Sidebar/>

                     {!selectedUser ? <NoChatSelected/> : <Chatcontainer/> }
                 </div>
              </div>
            </div>
        </div>
  )
}

export default HomePage
