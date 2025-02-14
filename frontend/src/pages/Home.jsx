import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, setPage } from "../redux/gameSlice";
import GameCard from "../components/GameCard";
import SideBarComponent from "../components/SideBarComponent";
import DropDown from "../components/DropDown";

const Home = () => {
  const dispatch = useDispatch();
  const { games, page, loading, error, fetchedPages } = useSelector(
    (state) => state.games
  );
  const [genre, setGenre] = useState("");
  const [ordering, setOrdering] = useState("");

  const uniqueGenres = [...new Set(games.flatMap(game => 
    game.genres.map(genre => genre.name)
  ))];

  const orderingOptions = [
    "Relevance",
    "Date added",
    "Name",
    "Release date",
    "Popularity",
    "Average rating"
  ];

  useEffect(() => {
    if (!fetchedPages.includes(page)) {
      dispatch(fetchGames(page));
    }
  }, [page, dispatch, fetchedPages]);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-7 bg-[#161616] text-white relative mt-10 w-full">
      <div className="flex flex-row gap-5 w-full">
        <div className="w-[200px]"><SideBarComponent/></div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-5 text-white">Game List</h2>
          
          <div className="flex gap-4 mb-6">
            <DropDown 
              options={uniqueGenres}
              onSelect={setGenre}
              selectedOption={genre}
              label="Genre"
            />
            <DropDown 
              options={orderingOptions}
              onSelect={setOrdering}
              selectedOption={ordering}
              label="Order by"
            />
          </div>

          <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </ul>
          
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
      </div>
    </div>
  );
};

export default Home;
