import axios from "axios";
import { AlertCircle, BookmarkPlus, Calendar, Heart, Loader2, Monitor, ShoppingBag, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [showFullPlatforms, setShowFullPlatforms] = useState(false);
  const [showFullStores, setShowFullStores] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameResponse = await axios.get(
          `https://api.rawg.io/api/games/${id}`,
          { params: { key: import.meta.env.VITE_GAME_API_KEY } }
        );

        const screenshotResponse = await axios.get(
          `https://api.rawg.io/api/games/${id}/screenshots`,
          { params: { key: import.meta.env.VITE_GAME_API_KEY } }
        );

        setGame(gameResponse.data);
        setScreenshots(screenshotResponse.data.results);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleWishlist = async() => {
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
      toast.success(`${response.data.msg}`, { theme: 'dark', type:'success' });
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong", { theme: 'dark', type:'error' });
    }
  };

  const handleFavorites = async() => {
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#161616]">
      <Loader2 className="w-10 h-10 text-white animate-spin" />
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-[#161616] text-white">
      <AlertCircle className="w-8 h-8 text-red-500 mr-2" />
      <p className="text-xl">Error: {error.message}</p>
    </div>
  );

  return (
    <div className="bg-[#161616] min-h-screen text-white">
      {game && (
        <>
          {/* Hero Section */}
          <div 
            className="h-[60vh] relative bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(22, 22, 22, 0.3), rgba(22, 22, 22, 1)), url(${game.background_image})`
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-10 max-w-6xl mx-auto">
              <h1 className="text-7xl font-bold mb-4 text-white drop-shadow-lg">
                {game.name}
              </h1>
              <div className="flex items-center gap-4">
                {game.metacritic && (
                  <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xl">
                    {game.metacritic}
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={handleWishlist}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isInWishlist
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-purple-500/20 hover:bg-purple-500/30'
                    }`}
                  >
                    <BookmarkPlus className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
                    <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                  </button>
                  <button
                    onClick={handleFavorites}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isInFavorites
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-red-500/20 hover:bg-red-500/30'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInFavorites ? 'fill-white' : ''}`} />
                    <span>{isInFavorites ? 'In Favorites' : 'Add to Favorites'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Game Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-black/50 p-6 rounded-xl backdrop-blur-sm hover:bg-black/70 transition">
                <Calendar className="w-6 h-6 mb-2 text-gray-400" />
                <h3 className="text-gray-400 text-sm">Release Date</h3>
                <p className="text-xl font-semibold">{formatDate(game.released)}</p>
              </div>
              <div className="bg-black/50 p-6 rounded-xl backdrop-blur-sm hover:bg-black/70 transition">
                <Trophy className="w-6 h-6 mb-2 text-gray-400" />
                <h3 className="text-gray-400 text-sm">Rating</h3>
                <p className="text-xl font-semibold">{game.rating}/5</p>
              </div>
              <div 
                className="bg-black/50 p-6 rounded-xl backdrop-blur-sm hover:bg-black/70 transition relative group"
                onMouseEnter={() => setShowFullPlatforms(true)}
                onMouseLeave={() => setShowFullPlatforms(false)}
              >
                <Monitor className="w-6 h-6 mb-2 text-gray-400" />
                <h3 className="text-gray-400 text-sm">Platforms</h3>
                <p className="text-xl font-semibold truncate">
                  {game.platforms.map(p => p.platform.name).slice(0, 2).join(", ")}
                  {game.platforms.length > 2 && "..."}
                </p>
                {/* Full platforms tooltip */}
                {showFullPlatforms && game.platforms.length > 2 && (
                  <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black rounded-lg shadow-xl z-10 max-w-[300px]">
                    <div className="text-sm text-gray-300">
                      {game.platforms.map(p => p.platform.name).join(", ")}
                    </div>
                  </div>
                )}
              </div>
              <div 
                className="bg-black/50 p-6 rounded-xl backdrop-blur-sm hover:bg-black/70 transition relative group"
                onMouseEnter={() => setShowFullStores(true)}
                onMouseLeave={() => setShowFullStores(false)}
              >
                <ShoppingBag className="w-6 h-6 mb-2 text-gray-400" />
                <h3 className="text-gray-400 text-sm">Available On</h3>
                <p className="text-xl font-semibold truncate">
                  {game.stores.map(s => s.store.name).slice(0, 2).join(", ")}
                  {game.stores.length > 2 && "..."}
                </p>
                {/* Full stores tooltip */}
                {showFullStores && game.stores.length > 2 && (
                  <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black rounded-lg shadow-xl z-10 max-w-[300px]">
                    <div className="text-sm text-gray-300">
                      {game.stores.map(s => s.store.name).join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* About Section */}
            <section className="mb-16">
              <h2 className="text-4xl font-bold mb-6">About</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-300">
                  {game.description_raw}
                </p>
              </div>
            </section>

            {/* Screenshots Section */}
            {screenshots.length > 0 && (
              <section>
                <h2 className="text-4xl font-bold mb-6">Screenshots</h2>
                <div className="space-y-6">
                  {/* Main Screenshot */}
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <img
                      src={screenshots[activeScreenshot].image}
                      alt="Game Screenshot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    {screenshots.map((shot, index) => (
                      <button
                        key={shot.id}
                        onClick={() => setActiveScreenshot(index)}
                        className={`aspect-video rounded-lg overflow-hidden transition ${
                          index === activeScreenshot ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={shot.image}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;