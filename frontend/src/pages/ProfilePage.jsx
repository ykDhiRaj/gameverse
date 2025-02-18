import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Settings, 
  Star, 
  ChevronRight, 
  Gamepad2, 
  User, 
  Edit, 
  LogOut 
} from 'lucide-react';
import GameCard from '../components/GameCard';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [showSettings, setShowSettings] = useState(false);
  const [userData, setUserData] = useState(null);
  const [games, setGames] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate('/');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/userprofile', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserData(response.data);
        fetchGames(response.data[activeTab]);

        // Generate avatar with initials
        const userInitials = getInitials(response.data.username);
        const avatar = createAvatar(initials, {
          seed: userInitials,
        });
        setSvg(avatar.toString());
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [activeTab]);

  const fetchGames = async (gameIds) => {
    const fetchedGames = await Promise.all(
      gameIds.map(async (gameId) => {
        const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
          params: { key: import.meta.env.VITE_GAME_API_KEY },
        });
        return response.data;
      })
    );
    setGames(fetchedGames);
  };
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#161616] to-[#0c0c0c] text-white p-6 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 mb-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{userData.username}</h1>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-blue-400" />
                  <span>{userData.gamesCount} Games</span>
                </div>
              </div>
            </div>

            {/* Settings Button */}
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="absolute top-8 right-8 p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>

          {/* Settings Dropdown */}
          {showSettings && (
            <div className="absolute top-24 right-8 w-64 bg-gray-800 rounded-xl shadow-xl z-10 overflow-hidden">
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <User className="w-5 h-5 text-blue-400" />
                  <span>Edit Profile</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-colors text-red-400" onClick={handleLogout}>
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'favorites' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            <Star className={`w-5 h-5 ${activeTab === 'favorites' ? 'text-yellow-300' : ''}`} />
            Favorites
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'wishlist' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            <Heart className={`w-5 h-5 ${activeTab === 'wishlist' ? 'text-red-400' : ''}`} />
            Wishlist
          </button>
        </div>

        {/* Games Grid */}
        {games.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">
              No {activeTab === 'favorites' ? 'favorite' : 'wishlisted'} games yet
            </h3>
            <p className="text-gray-400">
              {activeTab === 'favorites' 
                ? 'Start adding games to your favorites!' 
                : 'Add games to your wishlist to track them.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                isInWishlist={userData.wishlist.includes(game.id)} 
                isInFavorites={userData.favorites.includes(game.id)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;