import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, setPage } from "../redux/gameSlice";
import GameCard from "../components/GameCard";

const Home = () => {
  const dispatch = useDispatch();
  const { games, page, loading, error, fetchedPages } = useSelector((state) => state.games);

  useEffect(() => {
    if (!fetchedPages.includes(page)) {
      dispatch(fetchGames(page));
    }
  }, [page, dispatch, fetchedPages]);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-7 bg-[#161616] text-white mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">Game List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ul>

      {/* Load More Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => dispatch(setPage(page + 1))}
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
