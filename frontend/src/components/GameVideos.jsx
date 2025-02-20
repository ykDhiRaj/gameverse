import React, { useEffect, useState } from "react";
import { Gamepad2, Loader2, AlertCircle } from "lucide-react";

const GameVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/game-videos");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-400">
      <AlertCircle className="w-12 h-12 mb-4" />
      <p className="text-xl">Error: {error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-12">
        <Gamepad2 className="w-10 h-10 text-purple-500" />
        <h1 className="text-4xl font-bold text-white">Latest Game Videos</h1>
      </div>

      {videos.length === 0 ? (
        <p className="text-gray-400 text-center text-xl">No videos available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="bg-gray-800 rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              {video.image && (
                <div className="relative aspect-video">
                  <img 
                    src={video.image.square_small} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  {video.low_url && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <video 
                        className="w-full h-full object-cover"
                        controls
                        poster={video.image.square_small}
                      >
                        <source src={video.low_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {video.deck}
                </p>
                <a
                  href={video.site_detail_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Watch on GameSpot
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameVideos;