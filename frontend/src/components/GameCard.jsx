import React from "react";
import { useNavigate } from "react-router-dom";


function GameCard({ game }) {
  const { id, platforms, background_image, name, released,rating,genres } = game;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  
   // Output: "July 17, 2020"
  
  const navigate = useNavigate();
  const goTo = (id) =>{
      navigate(`/games/${id}`);
  }

  return (
    <li
      key={id}
      className="p-5 bg-gradient-to-t from-gray-900 to-black rounded-lg shadow-lg flex flex-col space-y-4 transform transition-transform duration-300 hover:scale-102"
    >
      <img
        src={background_image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <div className="flex flex-col space-y-2">
        <p className="text-lg font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-200">Release Date: {formatDate(released)}</p> 
        <div>
          <h1 className="p-1 text-lg text-white">Rating:{" "}{rating}</h1>
        </div>
        <div className="flex flex-wrap gap-2  text-lg text-white">
          Genres:
          {genres.map((genre)=>
          <h1
            key={genre.id}
            className="underline underline-offset-4 hover:text-gray-300 hover:cursor-pointer"
          >
            {genre.name}
          </h1>)}
        </div>
      </div>
      <button onClick={()=>goTo(id)} className="mt-auto bg-gray-700 text-white rounded-md px-4 py-2 transition-colors duration-300 hover:bg-gray-900 hover:text-gray-300">
        View more
      </button>
    </li>
  );
}

export default GameCard;
