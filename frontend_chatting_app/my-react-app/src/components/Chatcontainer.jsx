import React, { useEffect, useRef } from 'react'
import { usechatstore } from '../store/useChatStore'
import ChatContainerSkeleton from './Skeletons/ChatContainerSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { HelpCircle, X } from 'lucide-react';
import Chatheader from './Chatheader';
import MessageInput from './MessageInput';
import { formatDistanceToNow } from 'date-fns';


const Chatcontainer = () => {
  const {selectedUser,UnSubscribeFromMessages,SubscribeToMessages,setSelectedUser,isMessageLoading,messages,getMessages} = usechatstore()
  const {OnlineUsers,authUser} = useAuthStore()
    const messageEndRef = useRef(null);

 useEffect(() => {
  
    getMessages(selectedUser._id);
      SubscribeToMessages();

  return ()=>UnSubscribeFromMessages()
}, [selectedUser?._id]);
 
useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

console.log("messsages are",messages)
  if (isMessageLoading || !authUser?.data?._id) return <ChatContainerSkeleton />;
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <Chatheader/>
       <div className='flex-1 overflow-y-auto p-4 space-y-4 '>
       {messages.map((message)=>(
        <div 
        key={message._id}
        className={`chat ${message.senderId?.toString() === authUser.data._id?.toString()?"chat-end":"chat-start"}`}>
            <div className='chat-image avatar'>
                    <div className='size-10 rounded-full border'>
                      {console.log(message.senderId,authUser.data._id,selectedUser._id)}
                      <img 
                      src={message.senderId?.toString() === authUser.data._id?.toString() 
                        ? authUser.data.profilepic ||"/avatar.png" 
                        : selectedUser.profilepic||"/avatar.png"} 
                        alt="profilepic" />

                    </div>
            </div>
            <div className='chat-header mb-1'>
                  <time className='text-xs opacity-50'>
                         {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
        </div>
       ))}
        <div ref={messageEndRef} />
       </div>
       <div className=''><MessageInput/></div>
      
    </div>
  )
}

export default Chatcontainer
