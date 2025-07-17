import { create } from "zustand";
import { axiosInstance } from "/src/lib/axios.js";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
//import { getMessages } from "../../../../backend_chatting_app/src/controllers/message_controller"

export const usechatstore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  OnlineUsers: [],

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/api/message/users");
      set({ users: res.data.message });
    } catch (error) {
      toast.error(res.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/api/message/${userId}`);
      set({ messages: res.data.data });
    } catch (error) {
      toast.error(res.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage: async (FormdataMessage) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/api/message/send/${selectedUser._id}`,
        FormdataMessage,
        {
          headers: {
            "Content-Type": "multipart/form-data", // 🛠️ Important!
          },
        }
      );
      set({ messages: [...messages, res.data.data] });
    } catch (error) {
      toast.error(res.response.data.message);
    }
  },
  SubscribeToMessages:()=>{
        const {selectedUser} = get()
        if(!selectedUser){
          return;
        }
        const socket = useAuthStore.getState().socket;
        socket.off("newMessag")
        socket.on("newMessage",(newMessage)=>{
         set((state) => ({
  messages: [...state.messages, newMessage],
}));

        })

  },  UnSubscribeFromMessages:()=>{
       
        const socket = useAuthStore.getState().socket;
        socket.off("newMessag")

  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
