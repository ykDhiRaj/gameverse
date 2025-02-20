import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/gameSlice";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
    // If not on home page, navigate to home
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleClick = ()=>{
    navigate('/');
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#161616] h-16 text-white flex items-center justify-between px-5 z-50">
      <h1 onClick={handleClick} className="text-3xl cursor-pointer">Gameverse</h1>
      <div className="flex items-center justify-center gap-2">
        <input
          className="bg-[#3B3B3B] p-2 px-3 rounded-4xl w-[42rem] outline-none"
          placeholder="Search games..."
          type="text"
          onChange={handleSearch}
        />
        <IoSearch size={25} cursor={'pointer'} />
      </div>
      <div className="flex items-center justify-center gap-8">
        <div className="flex gap-3">
          <FaUserCircle size={30} cursor={'pointer'} />
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
