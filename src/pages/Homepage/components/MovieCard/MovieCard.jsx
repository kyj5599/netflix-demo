import React from "react";
import "./MovieCard.style.css";

const MovieCard = ({ movie, index }) => {
  // Calculate duration (mock - in real app, get from API)
  const duration = 94; // minutes
  const watched = 1; // minutes
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : new Date().getFullYear();
  const topNumber = index !== undefined && index < 20 ? index + 1 : null;

  return (
    <div className="movie-card-wrapper">
      <div
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_face${movie.poster_path})`,
        }}
        className="movie-card"
      >
        {topNumber && (
          <div className="top-badge">
            <span className="top-badge-text">TOP {topNumber}</span>
          </div>
        )}
        <div className="movie-card-content">
          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-btn play-btn" aria-label="재생">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <button className="action-btn" aria-label="내가 찜한 콘텐츠">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button className="action-btn" aria-label="좋아요">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 10v12M15 5.19C15 4.45 14.55 4 13.81 4c-.36 0-.9.21-1.22.55L7 10v12h9.28c1.12 0 1.68-.84 1.68-1.68V10.72c0-.84-.56-1.68-1.68-1.68H15V5.19z" />
              </svg>
            </button>
            <button className="action-btn" aria-label="더보기">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Movie Info */}
          <div className="movie-info">
            <div className="movie-title">{movie.title}</div>
            <div className="movie-meta">
              <span className="release-date">{releaseYear}</span>
              <span className="rating">{movie.vote_average?.toFixed(1)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(watched / duration) * 100}%` }}
              ></div>
            </div>
            <div className="duration-info">
              총 {duration}분 중 {watched}분
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
