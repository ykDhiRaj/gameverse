import axios from 'axios';
import {
  BookmarkPlus,
  ChevronRight,
  Gamepad2,
  Heart,
  LogOut,
  Settings,
  User
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FavoritesCard from '../components/FavoritesCard';
import WishlistCard from '../components/WishlistCard';
import { removeUser } from '../redux/userSlice';


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [showSettings, setShowSettings] = useState(false);
  const [userData, setUserData] = useState(null);
  // const [games, setGames] = useState([]);
  // const [wishlist, setWishlist] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  const [fetchedwishlist, setfetchedWishlist] = useState([]);
  const [fetchedfavorites, setfetchedFavorites] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  console.log(fetchedfavorites);
  console.log(fetchedwishlist)
  // console.log(activeTab);
  // console.log(games);

  const handleClick = () => {
    navigate('/profile/edit');
  }
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate('/');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/userprofile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(response.data);
        setUserData(response.data);
        // fetchfavGames(response.data.favorites);
        // fetchwishGames(response.data.wishlist);
        // fetchGames(response.data[activeTab]);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchfavGames(userData.favorites || []);
      fetchwishGames(userData.wishlist || []);
    }
  }, [userData]);

  const fetchfavGames = async (gameIds) => {
    try {
      const fetchedfavGames = await Promise.all(
        gameIds.map(async (gameId) => {
          try {
            const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
              params: { key: import.meta.env.VITE_GAME_API_KEY },
            });
            return response.data;
          } catch (error) {
            console.error(`Error fetching game ${gameId}:`, error);
            return null; // Return null instead of failing all
          }
        })
      );
      setfetchedFavorites(fetchedfavGames.filter(game => game !== null)); // Remove failed fetches
    } catch (error) {
      console.error("Error fetching favorite games:", error);
    }
  };
  

  const fetchwishGames = async (gameIds) => {
    try {
      const fetchedfavGames = await Promise.all(
        gameIds.map(async (gameId) => {
          try {
            const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
              params: { key: import.meta.env.VITE_GAME_API_KEY },
            });
            return response.data;
          } catch (error) {
            console.error(`Error fetching game ${gameId}:`, error);
            return null; // Return null instead of failing all
          }
        })
      );
      setfetchedWishlist(fetchedfavGames.filter(game => game !== null)); // Remove failed fetches
    } catch (error) {
      console.error("Error fetching favorite games:", error);
    }
  };

  const handleRemoveFromWishlist = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/wishlist/remove`, {
        data: { gameId: id },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setfetchedWishlist((prevGames) => prevGames.filter((game) => game.id !== id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleRemoveFromFavorites = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/favorites/remove`, {
        data: { gameId: id },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setfetchedFavorites((prevGames) => prevGames.filter((game) => game.id !== id));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
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
                  <span>{fetchedwishlist.length} Wishlist</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-blue-400" />
                  <span>{fetchedfavorites.length} Favorites</span>
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
                <button onClick={handleClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-colors">
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
            onClick={() => setActiveTab('wishlist')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'wishlist' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            <BookmarkPlus className={`w-5 h-5 ${activeTab === 'wishlist' ? 'text-green-400' : ''}`} />
            Wishlist
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'favorites' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            <Heart className={`w-5 h-5 ${activeTab === 'favorites' ? 'text-red-400' : ''}`} />
            Favorites
          </button>
        </div>

        {/* Games Grid */}
        {
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {activeTab === 'favorites' ? 
              fetchedfavorites.map((fav)=>(
              <FavoritesCard 
              key={fav.id} 
              game={fav} 
              onRemove={handleRemoveFromFavorites} 
            />
              ))
               : fetchedwishlist.map((wish)=>(<WishlistCard 
                key={wish.id} 
                game={wish} 
                onRemove={handleRemoveFromWishlist} 
              />))
                
            }
          </div>
        }
      </div>
    </div>
  );
};

export default ProfilePage;