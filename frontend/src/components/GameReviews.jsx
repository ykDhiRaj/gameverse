import React, { useEffect, useState } from "react";
import { ExternalLink, Loader2, GamepadIcon, AlertCircle } from "lucide-react";

const RatingBar = ({ score }) => {
  // Calculate color based on score
  const getColor = (score) => {
    if (score <= 4) return "bg-red-500";
    if (score <= 6) return "bg-yellow-500";
    if (score <= 8) return "bg-emerald-500";
    return "bg-green-500";
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="h-2 flex-1 bg-neutral-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${getColor(score)}`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-neutral-200 font-medium min-w-[40px]">{score}/10</span>
    </div>
  );
};

const GameReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/game-reviews`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#161616]">
      <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
    </div>
  );


  if (error) {
    return (
      <div className="flex  flex-col items-center justify-center min-h-screen bg-[#161616] text-red-400">
      <AlertCircle className="w-12 h-12 mb-4" />
      <p className="text-xl">Error: {error}</p>
    </div>
    );
  }

  const [featuredReview, ...otherReviews] = reviews;

  return (
    <div className="min-h-screen bg-[#161616] px-4 py-8 mt-16">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <GamepadIcon className="w-8 h-8 text-neutral-100 opacity-80" />
          <h1 className="text-4xl font-bold text-neutral-100 tracking-tight border-b">Latest Game Reviews</h1>
        </div>
        
        {reviews.length === 0 ? (
          <p className="text-neutral-400">No reviews available</p>
        ) : (
          <div className="space-y-12">
            {/* Featured Review */}
            <div className="group bg-black backdrop-blur-sm rounded-xl overflow-hidden
                          hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 ease-out 
                          border border-neutral-800/50 hover:border-neutral-700/50  hover:bg-neutral-900/80">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image Section */}
                <div className="relative h-[400px] overflow-hidden bg-neutral-800/50">
                  {featuredReview.image ? (
                    <img
                      src={featuredReview.image.original}
                      alt={featuredReview.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <GamepadIcon className="w-16 h-16 text-neutral-700" />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="mb-6">
                      <h2 className="text-3xl font-semibold text-neutral-100 tracking-tight mb-4 group-hover:text-white transition-colors duration-300">
                        {featuredReview.title}
                      </h2>
                      <p className="text-neutral-500 font-medium mb-4">By {featuredReview.authors}</p>
                      <RatingBar score={featuredReview.score} />
                    </div>
                    <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                      {featuredReview.deck}
                    </p>
                  </div>
                  <a
                    href={featuredReview.site_detail_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sky-400/80 hover:text-sky-400 transition-all duration-300 group/link mt-6"
                  >
                    <span className="font-medium">Read Full Review</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Other Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherReviews.map(review => (
                <div 
                  key={review.id}
                  className="group bg-black backdrop-blur-sm rounded-xl overflow-hidden 
                           hover:shadow-xl hover:shadow-white/10 transition-all duration-500 ease-out 
                           border border-neutral-800/50 hover:border-neutral-700/50
                           hover:bg-neutral-900/80 hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-neutral-800/50">
                    {review.image ? (
                      <img
                        src={review.image.original}
                        alt={review.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GamepadIcon className="w-12 h-12 text-neutral-700" />
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-neutral-100 tracking-tight mb-4 group-hover:text-white transition-colors duration-300 line-clamp-2">
                      {review.title}
                    </h2>
                    <p className="text-neutral-500 text-sm font-medium mb-3">By {review.authors}</p>
                    <RatingBar score={review.score} />
                    <p className="text-neutral-400 mt-4 mb-6 line-clamp-2 group-hover:text-neutral-300 transition-colors duration-300">
                      {review.deck}
                    </p>
                    <a
                      href={review.site_detail_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sky-400/80 hover:text-sky-400 transition-all duration-300 group/link"
                    >
                      <span className="font-medium">Read Full Review</span>
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameReviews;