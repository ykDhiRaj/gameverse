import { AlertCircle, Calendar, ExternalLink, Gamepad2, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

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
    <div className="flex items-center justify-center min-h-screen bg-[#161616]">
      <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
    </div>
  );

  if (error) return (
    <div className="flex  flex-col items-center justify-center min-h-screen bg-[#161616] text-red-400">
      <AlertCircle className="w-12 h-12 mb-4" />
      <p className="text-xl">Error: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen mt-10 bg-[#161616] text-white p-8">
      <div className="max-w-[110rem] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Gamepad2 className="w-10 h-10 text-gray-400" />
          <h1 className="text-4xl font-bold">Latest Game Videos</h1>
        </div>

        {videos.length === 0 ? (
          <p className="text-gray-400 text-center text-xl">No videos available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div 
                key={video.id} 
                className={`bg-gray-800/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-gray-700/20 transition-all duration-300 ease-in-out ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className="relative aspect-video group">
                  <img 
                    src={video.image.original} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  {video.hd_url && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <video 
                        className="w-full h-full object-cover"
                        controls
                        poster={video.image.original}
                      >
                        <source src={video.hd_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                    {video.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {video.deck}
                  </p>
                  {index === 0 && (
                    <div className="mb-4">
                      <div className="flex items-center text-gray-500 mb-2">
                        <Calendar size={16} className="mr-2" />
                        <span>{new Date(video.publish_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                  <a
                    href={video.site_detail_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-full transition-colors duration-300"
                  >
                    Watch on GameSpot
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameVideos;