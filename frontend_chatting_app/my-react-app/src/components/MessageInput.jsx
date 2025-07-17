import React, { useEffect, useState, useRef } from "react";
import { usechatstore } from "../store/useChatStore";
import ChatContainerSkeleton from "./Skeletons/ChatContainerSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { X, Image, Send } from "lucide-react";

const MessageInput = () => {
  const { sendMessage } = usechatstore();

  const [text, setText] = useState("");

  const [imagePreview, setimagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const removeImage = () => {
    setimagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handelImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    // must match multer's `.single("profilepic")`

    setimagePreview(URL.createObjectURL(file)); // preview image
  };

  const handelMessageSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    if (text) {
      formData.append("text", text.trim());
    }

    try {
      await sendMessage(formData);
      setText("");
      setimagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handelMessageSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />

          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handelImageSelect}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
