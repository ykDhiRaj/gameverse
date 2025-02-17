import React, { useState } from 'react';
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


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [showSettings, setShowSettings] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = ()=>{
    dispatch(removeUser());
  }

  // Mock data - replace with actual data from your state management
  const mockUser = {
    name: "Alex Gaming",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400",
    level: 42,
    gamesCount: 156
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#161616] to-[#0c0c0c] text-white p-6 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 mb-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-500/50">
                <img 
                  src={mockUser.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-blue-400" />
                  <span>{mockUser.gamesCount} Games</span>
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
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-colors text-red-400">
                  <LogOut className="w-5 h-5" />
                  <span onClick={handleLogout}>Log Out</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Replace this with actual game data from your state */}
          {/* {[1, 2, 3].map((game) => (
            <div key={game} className="bg-gray-900/60 rounded-xl p-4 backdrop-blur-sm animate-fade-in">
              <div className="h-48 bg-gray-800/50 rounded-lg mb-4 animate-pulse" />
              <div className="h-6 bg-gray-800/50 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-4 bg-gray-800/50 rounded w-1/2 animate-pulse" />
            </div>
          ))} */}
          
        </div>

        {/* Empty State */}
        {/* {false && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800/50 mb-4">
              {activeTab === 'favorites' ? (
                <Star className="w-10 h-10 text-gray-600" />
              ) : (
                <Heart className="w-10 h-10 text-gray-600" />
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No {activeTab === 'favorites' ? 'favorite' : 'wishlisted'} games yet
            </h3>
            <p className="text-gray-400">
              {activeTab === 'favorites' 
                ? 'Start adding games to your favorites!'
                : 'Add games to your wishlist to track them.'}
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProfilePage;