import React from "react";
import "./MovieGridSkeleton.style.css";

const MovieGridSkeleton = () => {
  return (
    <div className="movie-grid-skeleton">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="movie-card-skeleton">
          <div className="movie-card-skeleton-poster"></div>
          <div className="movie-card-skeleton-info">
            <div className="movie-card-skeleton-title"></div>
            <div className="movie-card-skeleton-meta">
              <div className="skeleton-badge"></div>
              <div className="skeleton-badge short"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGridSkeleton;

