import React, { useState } from "react";
import usePopularMoviesQuery from "../../../../hooks/usePopularMovies";
import useMovieDetailsQuery from "../../../../hooks/useMovieDetails";
import { getYouTubeTrailerKey } from "../../../../utils/videoUtils";
import VideoModal from "../../../../components/VideoModal/VideoModal";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";

const Banner = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const movie = data?.results[0];
  const { data: movieDetails } = useMovieDetailsQuery(movie?.id);

  if (isLoading) {
    return (
      <div className="banner banner-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }
  if (isError) return <Alert variant="danger">Error: {error.message}</Alert>;
  
  const backdropUrl = movie?.backdrop_path
    ? `https://media.themoviedb.org/t/p/original${movie.backdrop_path}`
    : movie?.poster_path
    ? `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path}`
    : "";

  // Get YouTube trailer
  const trailerKey = movieDetails ? getYouTubeTrailerKey(movieDetails) : null;

  // Handle play button click
  const handlePlayClick = () => {
    if (trailerKey) {
      setIsVideoModalOpen(true);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backdropUrl})`,
      }}
      className="banner"
    >
      <div className="banner-overlay"></div>
      <div className="banner-text-area">
        <h1 className="banner-title">{movie?.title}</h1>
        <p className="banner-description">{movie?.overview}</p>
        <div className="banner-buttons">
          <button
            className="banner-btn banner-btn-play"
            onClick={handlePlayClick}
            disabled={!trailerKey}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>재생</span>
          </button>
        </div>
      </div>
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoKey={trailerKey}
        movieTitle={movie?.title}
      />
    </div>
  );
};

export default Banner;
