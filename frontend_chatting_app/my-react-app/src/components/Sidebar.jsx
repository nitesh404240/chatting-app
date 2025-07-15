import React, { useEffect } from 'react'
import { usechatstore } from '../store/useChatStore'
import SidebarSkeleton from './Skeletons/SidebarSkeleton'
import { Users } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const Sidebar = () => {
  const { users ,selectedUser ,getUsers,isUserLoading ,setSelectedUser, isMessageLoading }=usechatstore()
  const {OnlineUsers} = useAuthStore()

  useEffect(()=>{
       getUsers()
  },[getUsers])

  if(isUserLoading) return <SidebarSkeleton/>

  return (
    <aside
       className="h-full w-20 lg:w-65 border-r border-base-300 
    flex flex-col transition-all duration-0"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
       <div className='overflow-y-auto w-full py-3'>
        {Array.isArray(users.message) && users.message.map((user) => (
  <button
    key={user._id}
    onClick={() => setSelectedUser(user)}
    className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors  ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
  >
    <div className="relative mx-auto lg:mx-0">
      <img
        src={user.profilepic || "/avatar.png"}
        alt={user.username}
        className="size-10 object-cover rounded-full"
      />
      {OnlineUsers.includes(user._id) && (
        <span className="absolute bottom-0 right-0 size-3 bg-green-600 rounded-full ring-2 ring-zinc-900"></span>
      )}
    </div>
    <div className="hidden lg:block text-left min-w-0">
      <div className="font-medium truncate">{user.fullname}</div>
      
      <div className="text-sm text-zinc-400">
        {OnlineUsers.includes(user._id) ? "online" : "offline"}
      </div>
    </div>
  </button>
))}

       </div>
    </aside>
  )
}

export default Sidebar
