import React from 'react'
import Chatheader from '../Chatheader';
import MessageInput from "../MessageInput"
const ChatContainerSkeleton = () => {
  
        const skeletonMessages = Array(4).fill(null);

  return (
    
    <div className="flex flex-col h-full w-2xl">
        <div className='border-b border-base-300'><Chatheader/></div>
      <div className="flex-1 overflow-y-auto px-4 space-y-3">
             {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <div className="skeleton w-full h-full rounded-full" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16" />
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-16 w-[200px]" />
          </div>
        </div>
      ))}
     
      </div>
       <div className="p-2">
        <MessageInput /> {/* Optional */}
      </div>
    </div>
  );
}

export default ChatContainerSkeleton

//  <div className='h-16 w-2xl border-b border-base-300 
//     flex flex-col transition-all duration-0'>
//       <div className='overflow-y-hidden  mt-3'>
//              <div className='flex flex-1 items-center justify-center gap-4'>
//                   <div className=''>
//                       <div className="skeleton size-12 rounded-full" />
//                   </div>
//                    <div className='w-full'>
//                            <div className="skeleton h-5 w-32" />

//                            <div className="skeleton h-3 mt-2 w-16" />
//                    </div>
//              </div>
//       </div>
//     </div>