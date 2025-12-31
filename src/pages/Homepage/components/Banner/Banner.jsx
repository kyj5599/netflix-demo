import React from "react";
import usePopularMoviesQuery from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  
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
  
  const movie = data?.results[0];
  const backdropUrl = movie?.backdrop_path
    ? `https://media.themoviedb.org/t/p/original${movie.backdrop_path}`
    : movie?.poster_path
    ? `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path}`
    : "";

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
        <div className="banner-buttons">
          <button className="banner-btn banner-btn-play">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>재생</span>
          </button>
          <button className="banner-btn banner-btn-info">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <span>상세 정보</span>
          </button>
        </div>
        <p className="banner-description">{movie?.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
