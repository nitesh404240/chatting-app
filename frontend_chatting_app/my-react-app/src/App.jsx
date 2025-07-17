import "./App.css";
import Nevbar from "./components/Nevbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import settingpanel from "./components/settingpanel.jsx";
import { usechatstore } from "./store/useChatStore.js";
import { createContext } from "react";
function App() {
  //new we can simply use this authentication globally everywherewe dont need to write the usestate everywhere and using propdrilling
  const { authUser, checkAuth, isCheckingAuth, OnlineUsers } = useAuthStore();
  const [theme, settheme] = useState("");
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // const { users ,selectedUser ,getUsers,isUserLoading ,setSelectedUser, isMessageLoading }=usechatstore()
  // useEffect(()=>{
  //      getUsers()
  // },[getUsers])
  // console.log(users)

  console.log(OnlineUsers);
  console.log(authUser);

  //adding the loader icon
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Nevbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        {/* <Route path = "/settings" element={<SettingsPage theme={theme} settheme={settheme}/>}/> */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
