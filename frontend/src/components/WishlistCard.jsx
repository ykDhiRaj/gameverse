import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash, Star, Calendar, ChevronRight } from "lucide-react";
import axios from "axios";

const WishlistCard = ({ game, onRemove }) => {
  const { id, background_image, name, released, rating, genres } = game;
  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      await axios.delete('http://localhost:3000/user/wishlist/remove', {
        data: { gameId: id },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onRemove(id); // Call the onRemove function passed as a prop
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleViewDetails = () => {
    navigate(`/games/${id}`); // Navigate to the game's details page
  };

  return (
    <li className="list-none relative overflow-hidden p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <img
          src={background_image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <div className="bg-black/80 px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{rating}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-wide">
            {name}
          </h3>
          <div className="flex gap-2">
            <button onClick={handleRemove} className="text-red-500 cursor-pointer">
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="text-gray-300">
          <span>Release Date: {new Date(released).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 text-sm bg-gray-800/50 text-gray-300 rounded-full hover:bg-gray-700 transition-colors duration-200"
            >
              {genre.name}
            </span>
          ))}
        </div>
        <button
          onClick={handleViewDetails}
          className="w-full mt-4 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 group"
        >
          <span>View Details</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </li>
  );
};

export default WishlistCard;