import React, { useState } from "react";
import {
  IoHomeSharp,
  IoCompass,
  IoTimeOutline,
  IoCalendarOutline,
  IoTrophyOutline,
  IoHeartOutline,
  IoSettingsOutline,
} from "react-icons/io5";

function SideBarComponent() {
  const menuItems = [
    { icon: IoHomeSharp, label: "Home" },
    { icon: IoCompass, label: "Discover" },
    { icon: IoTimeOutline, label: "Last Played" },
    { icon: IoCalendarOutline, label: "New Releases" },
    { icon: IoTrophyOutline, label: "Top Games" },
    { icon: IoHeartOutline, label: "Wishlist" },
    { icon: IoSettingsOutline, label: "Settings" },
  ];

  return (
    <div className="fixed top-24 left-7 max-h-[calc(100vh-6rem)] bg-[#151515]">
      <div
        className="bg-[#202020] text-gray-100 px-4 py-6 flex flex-col transition-all duration-300 ease-in-out rounded-lg"
      >
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center px-3 py-2.5 rounded-lg transition-colors hover:bg-gray-700"
                >
                  <item.icon className="h-6 text-gray-400" />
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideBarComponent;
