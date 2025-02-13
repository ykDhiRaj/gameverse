import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";


const Home = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: import.meta.env.VITE_GAME_API_KEY,
          dates: "2019-09-01,2024-09-30",
          platforms: "18,1,7",
          page: page,
          page_size: 20,
        },
      });
      setGames((prevGames) => [...prevGames, ...response.data.results]); // Append new data
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGames();
  }, [page]); // Fetch new data when `page` changes

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-7 bg-[#121212] text-white mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">Game List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ul>

      {/* Load More Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => setPage(page + 1)}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Home;
