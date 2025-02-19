import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, GamepadIcon, Calendar, ChevronRight, BookmarkPlus, Heart } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function GameCard({ game, isInWishlist, isInFavorites }) {
  const { id, background_image, name, released, rating, genres } = game;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const navigate = useNavigate();

  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add to wishlist", { theme: 'dark', type:'error' });
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/user/wishlist",
        { gameId: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log(response.data.msg); // This should work correctly
      toast.success(`${response.data.msg}`, { theme: 'dark', type:'success' });
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong", { theme: 'dark', type:'error' });
    }
  };
  
  const handleFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add to favorites", { theme: 'dark', type:'error' });
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/user/favorites",
        { gameId: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log(response.data.msg); // This should work correctly
      toast.success(`${response.data.msg}`, { theme: 'dark', type:'success' });
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong", { theme: 'dark', type:'error' });
    }
  };
  

  const ratingStars = Math.round((rating / 2) * 2) / 2; // Rounds to nearest 0.5

  return (
    <li
      key={id}
      className="list-none group relative overflow-hidden p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container with Overlay */}
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
        <img
          src={background_image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <div className="bg-black/80 px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-bold">{rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title and Action Buttons */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors duration-300">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            {isInWishlist ? (
              <button className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors duration-300 group">
                <BookmarkPlus className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
              </button>
            ) : (
              <button onClick={handleWishlist} className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors duration-300 group">
                <BookmarkPlus className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
              </button>
            )}
            {isInFavorites ? (
              <button className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors duration-300 group">
                <Heart className="w-6 h-6 text-gray-400 group-hover:text-pink-500 transition-colors duration-300" />
              </button>
            ) : (
              <button onClick={handleFavorites} className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors duration-300 group">
                <Heart className="w-6 h-6 text-gray-400 group-hover:text-pink-500 transition-colors duration-300" />
              </button>
            )}
          </div>
        </div>

        {/* Release Date */}
        <div className="flex items-center gap-2 text-gray-300">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{formatDate(released)}</span>
        </div>

        {/* Genres */}
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

        {/* View More Button */}
        <button
          onClick={() => navigate(`/games/${id}`)}
          className="w-full mt-4 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 group"
        >
          <span>View Details</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Decorative Gaming Icon */}
      <div className="absolute -right-6 -bottom-6 opacity-5 transform rotate-12">
        <GamepadIcon className="w-24 h-24" />
      </div>
    </li>
  );
}

export default GameCard;