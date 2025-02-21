import React, { useState } from "react";
import { FaUser } from 'react-icons/fa6';
import {
  IoBookmark,
  IoHomeSharp,
  IoInformationCircle,
  IoLogIn,
  IoSettings,
  IoVideocam,
  IoMenu,
  IoClose
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SideBarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  const menuItems = [
    { icon: IoHomeSharp, label: "Home", path: "/" },
    { icon: IoBookmark, label: "Reviews", path: "/reviews" },
    { icon: IoVideocam, label: "Videos", path: "/videos" },
    user ? 
    { icon: FaUser, label: "Profile", path: "/profile" } : null,
    !user ? 
    { icon: IoLogIn, label: "Login", path: "/login" } : null,
    { icon: IoSettings, label: "Settings", path: "/profile/edit" },
    { icon: IoInformationCircle, label: "About", path: "/about" },
  ].filter(Boolean);

  const handleNavigation = (path) => {
    if (path === "/" && location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden fixed top-15 left-7 z-50 rounded-md p-1 ${!isOpen? "bg-[#161616]": ""} text-white`}
      >
        {isOpen ? null : <IoMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:top-24 left-0 h-full md:h-auto w-64 md:w-[14rem] bg-[#151515]
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:static md:left-7 md:max-h-[calc(100vh-6rem)] md:transform-none
      `}>
        <div className="bg-[#202020] text-gray-100 h-full md:h-auto px-4 py-6 flex flex-col rounded-lg">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <IoClose size={24} />
            </button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors hover:bg-gray-700 
                      ${location.pathname === item.path ? 'bg-gray-700' : ''}`}
                  >
                    <item.icon className={`h-5 md:h-6 
                      ${location.pathname === item.path ? 'text-white' : 'text-gray-400'}`} 
                    />
                    <span className={`ml-3 text-sm font-medium 
                      ${location.pathname === item.path ? 'text-white' : ''}`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBarComponent;