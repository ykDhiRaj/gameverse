import React, { useState, useEffect, useRef } from 'react';
import { IoChevronDownOutline } from "react-icons/io5";

const DropDown = ({ options, onSelect, selectedOption, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-white" ref={dropdownRef}>
      <p className="mb-2 text-sm font-medium text-gray-300">{label}</p>
      <button
        onClick={toggleDropdown}
        className="bg-[#202020] px-4 py-2 rounded-lg flex items-center justify-between min-w-[200px] hover:bg-[#2a2a2a] transition-all duration-300"
      >
        <span>{selectedOption || `Select ${label}`}</span>
        <IoChevronDownOutline
          className={`ml-2 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-[#202020] rounded-lg shadow-lg z-50 transform opacity-100 scale-100 transition-all duration-300">
          <ul className="py-2">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-all duration-300 [animation:fadeIn_0.1s_ease-out_forwards] opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
