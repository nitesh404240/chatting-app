import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Settings, LogOut, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import SettingPanel from "./settingpanel"; // Make sure the name matches

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="bg-base-300 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center gap-2.5 hover:opacity-80 transition-all"
              >
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-lg font-bold">Chatty</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings((prev) => !prev)}
                className="btn btn-sm gap-2"
              >
                <Settings className="size-5" />
                <span className="hidden sm:inline">Settings</span>
              </button>

              {authUser && (
                <>
                  <Link to="/profile" className="btn btn-sm gap-2">
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                  <button onClick={logout} className="flex gap-2 items-center">
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Slide-Up Settings Panel */}
      <SettingPanel
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};

export default Navbar;
