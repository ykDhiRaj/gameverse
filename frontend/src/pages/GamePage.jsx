import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GamePage = () => {
  const { id } = useParams(); // Get game ID from URL params
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error.message}</p>;

  return (
    <div className="bg-[#161616] min-h-screen text-white p-6 mt-10">
      {game && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-7xl font-bold mb-6">{game.name}</h2>
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full rounded-lg shadow-lg mb-6"
          />
          <h1 className="text-5xl font-bold mb-5">About</h1>
          <p className="text-gray-300">{game.description_raw}</p>


          <div className="bg-black mt-5 p-10 rounded-lg hover:bg-gray-700 duration-300">
                {/* First Row */}
                <div className="grid grid-cols-2 gap-10 px-5">
                    <p className="text-2xl"><strong>Released:</strong> {formatDate(game.released)}</p>
                    <p className="text-2xl"><strong>Metacritic Score:</strong> {game.metacritic || "N/A"}</p>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-2 gap-10 px-5 mt-4">
                    <p className="text-2xl"><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(", ")}</p>
                    <p className="text-2xl"><strong>Store:</strong> {game.stores.map(s => s.store.name).join(", ")}</p>
                </div>
          </div>



          {/* Screenshots Section */}
          {screenshots.length > 0 && (
            <div className="mt-9 ">
              <h3 className="text-5xl font-semibold mb-5">Screenshots</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {screenshots.map((shot) => (
                  <img
                    key={shot.id}
                    src={shot.image}
                    alt="Screenshot"
                    className="w-full rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GamePage;
