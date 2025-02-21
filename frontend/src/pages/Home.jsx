import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, setPage } from "../redux/gameSlice";
import GameCard from "../components/GameCard";
import SideBarComponent from "../components/SideBarComponent";
import DropDown from "../components/DropDown";
import { Loader2 } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const { games, page, loading, error, fetchedPages, searchQuery } = useSelector(
    (state) => state.games
  );
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [ordering, setOrdering] = useState("");
  const loadMoreRef = useRef(null);

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

  const handleGenreSelect = (genre) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      }
      return [...prev, genre];
    });
  };

  const filteredAndSortedGames = games
    .filter(game => {
      const matchesSearch = searchQuery 
        ? game.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      const matchesGenres = selectedGenres.length === 0 
        ? true 
        : game.genres.some(genre => selectedGenres.includes(genre.name));
      
      return matchesSearch && matchesGenres;
    })
    .sort((a, b) => {
      switch (ordering.toLowerCase()) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'release date':
          return new Date(b.released) - new Date(a.released);
        case 'popularity':
          return b.added - a.added;
        case 'average rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  useEffect(() => {
    if (!fetchedPages.includes(page)) {
      dispatch(fetchGames(page));
    }
  }, [page, dispatch, fetchedPages]);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-7 bg-[#161616] text-white relative mt-10 w-full min-h-screen">
      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="w-full md:w-[200px] overflow-x-auto md:overflow-visible">
          <SideBarComponent/>
        </div>
        <div className="flex-1 px-2 md:px-0">
          <h2 className="text-2xl font-bold mb-5 text-white">Game List</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <DropDown 
              options={uniqueGenres}
              onSelect={handleGenreSelect}
              selectedOptions={selectedGenres}
              label="Genres"
              multiple={true}
            />
            <DropDown 
              options={orderingOptions}
              onSelect={setOrdering}
              selectedOption={ordering}
              label="Order by"
              multiple={false}
            />
          </div>

          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </ul>
          
          <div className="text-center mt-6" ref={loadMoreRef}>
            {loading ? (
              <div className="flex justify-center items-center p-4">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : (
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;