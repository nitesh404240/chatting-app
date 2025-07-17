import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { User, Camera, Mail } from "lucide-react";
const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(
    authUser?.data?.profilepic || ""
  );
  const { updatingprofilepic, isUpdatingProfilepic } = useAuthStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilepic", file); // must match multer's `.single("profilepic")`

    try {
      const res = await updatingprofilepic(formData);

      setSelectedImage(URL.createObjectURL(file)); // preview image
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div>
      <div className="h-screen">
        <div className="max-w-2xl mx-auto p-4 pt-10">
          <div className="bg-base-300 rounded-xl p-6 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold ">Profile</h1>
              <p className="text-base-content/60">Your profile information</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative size-34 rounded-full object-cover border-2 flex flex-col justify-center items-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Profile"
                    className="size-34 rounded-full object-cover border-4 "
                  />
                ) : (
                  <User className="size-24 " />
                )}

                <label
                  htmlFor="avatar-upload"
                  className={`
                                                            absolute bottom-0 right-0 
                                                            bg-base-content hover:scale-105
                                                            p-2 rounded-full cursor-pointer 
                                                            transition-all duration-200
                                                            ${
                                                              isUpdatingProfilepic
                                                                ? "animate-pulse pointer-events-none"
                                                                : ""
                                                            }
                                                          `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfilepic}
                  />
                </label>
              </div>
              <p className="text-base-content/60 mt-3">
                Click the camera icon to update yout photo
              </p>
            </div>
            <div className="w-auto">
              <label className="label">
                <>
                  <User className="size-4" />
                  <h1 className="text-1xl">Fullname</h1>
                </>
              </label>
              <h1 className="w-full text-1xl border rounded-xl py-1 px-3">
                {authUser.data.fullname}
              </h1>
              <label className="label mt-2">
                <>
                  <User className="size-4" />
                  <h1 className="text-1xl">username</h1>
                </>
              </label>
              <h1 className="w-full text-1xl border rounded-xl  py-1 px-3">
                {authUser.data.username}
              </h1>
              <label className="label mt-2">
                <>
                  <Mail className="size-4" />
                  <h1 className="text-1xl">Email</h1>
                </>
              </label>
              <h1 className="w-full text-1xl border rounded-xl  py-1 px-3">
                {authUser.data.email}
              </h1>

              <div className="flex items-center r px-12 ">
                <div className="flex pt-3">
                  <h1 className="text-lg font-medium  mb-4">
                    Account Information
                  </h1>
                </div>
              </div>
              <div className="flex items-center px-12 justify-between border-b border-zinc-700 py-2">
                <span>Member Since</span>
                <span>{authUser.data.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center px-12 justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
