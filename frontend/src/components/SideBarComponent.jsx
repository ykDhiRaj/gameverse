import React from "react";
import {
  IoHomeSharp,
  IoCalendar,
  IoHeart,
  IoSettings,
  IoBookmark,
  IoLogIn
} from "react-icons/io5";
import { FaUser } from 'react-icons/fa6';
import { useNavigate, useLocation } from "react-router-dom";
import {useSelector} from "react-redux"


function SideBarComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state)=>state.user.user);

  const menuItems = [
    { icon: IoHomeSharp, label: "Home", path: "/" },
    { icon: IoCalendar, label: "New Releases", path: "/new-releases" },
    { icon: IoHeart, label: "Favorites", path: "/favorites" },
    { icon: IoBookmark, label: "Wishlist", path: "/wishlist" },
    user ? 
    { icon: FaUser, label: "Profile", path: "/profile" } : null,
    { icon: IoSettings, label: "Settings", path: "/settings" },
    !user ? 
      { icon: IoLogIn, label: "Login", path: "/login" } : null
  ].filter(Boolean);

  const handleNavigation = (path) => {
    if (path === "/" && location.pathname === "/") {
      // If we're already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <div className="fixed top-24 left-7 max-h-[calc(100vh-6rem)] bg-[#151515]">
      <div className="bg-[#202020] text-gray-100 px-4 py-6 flex flex-col transition-all duration-300 ease-in-out rounded-lg">
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item, index)=>(
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors hover:bg-gray-700 ${
                    location.pathname === item.path ? 'bg-gray-700' : ''
                  }`}
                >
                  <item.icon className={`h-6 ${
                    location.pathname === item.path ? 'text-white' : 'text-gray-400'
                  }`} />
                  <span className={`ml-3 text-sm font-medium ${
                    location.pathname === item.path ? 'text-white' : ''
                  }`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideBarComponent;
