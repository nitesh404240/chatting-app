import React, { useEffect } from "react";
import { usechatstore } from "../store/useChatStore";
import ChatContainerSkeleton from "./Skeletons/ChatContainerSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const Chatheader = () => {
  const {
    selectedUser,
    setSelectedUser,
    isMessageLoading,
    messages,
    getMessages,
  } = usechatstore();
  const { OnlineUsers } = useAuthStore();
  return (
    <div className="overflow-y-hidden px-4 py-2 flex items-center justify-between">
      <div className="flex gap-4">
        <div>
          <img
            src={selectedUser.profilepic || "/avatar.png"}
            alt="profile pic"
            className="size-11 object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="font-medium truncate">{selectedUser.fullname}</h1>
          <span>
            {" "}
            {OnlineUsers.includes(selectedUser._id) ? "online" : "offline"}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          setSelectedUser(null);
        }}
        className=""
      >
        <X />
      </button>
    </div>
  );
};

export default Chatheader;
