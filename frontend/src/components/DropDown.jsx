import React, { useState, useEffect, useRef } from 'react';
import { IoChevronDownOutline, IoCheckmark } from "react-icons/io5";

const DropDown = ({ options, onSelect, selectedOption, selectedOptions, label, multiple = false }) => {
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
    if (multiple) {
      onSelect(option);
    } else {
      onSelect(option);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (multiple) {
      if (selectedOptions?.length === 0) return `Select ${label}`;
      return `${selectedOptions.length} selected`;
    }
    return selectedOption || `Select ${label}`;
  };

  return (
    <div className="relative inline-block text-white" ref={dropdownRef}>
      <p className="mb-2 text-sm font-medium text-gray-300">{label}</p>
      <button
        onClick={toggleDropdown}
        className="bg-[#202020] px-4 py-2 rounded-lg flex items-center justify-between min-w-[200px] hover:bg-[#2a2a2a] transition-all duration-300"
      >
        <span>{getDisplayValue()}</span>
        <IoChevronDownOutline
          className={`ml-2 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-[#202020] rounded-lg shadow-lg z-50 transform opacity-100 scale-100 transition-all duration-300 max-h-[300px] overflow-y-auto">
          <ul className="py-2">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-all duration-300 [animation:fadeIn_0.1s_ease-out_forwards] opacity-0 flex items-center justify-between"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{option}</span>
                {multiple && selectedOptions?.includes(option) && (
                  <IoCheckmark className="w-5 h-5 text-green-500" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
