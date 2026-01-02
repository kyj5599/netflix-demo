import React from "react";
import useGenresQuery from "../hooks/useGenres";
import useMovieDetailsQuery from "../hooks/useMovieDetails";
import "../pages/Homepage/components/MovieCard/MovieCard.style.css";

const MovieCard = ({ movie, index }) => {
  const { data: genresData } = useGenresQuery();
  const { data: movieDetails } = useMovieDetailsQuery(movie?.id);
  
  // Calculate duration (mock - in real app, get from API)
  const duration = 94; // minutes
  const watched = 1; // minutes
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : new Date().getFullYear();
  const topNumber = index !== undefined && index < 20 ? index + 1 : null;

  // Get genre names from genre IDs
  const getGenreNames = () => {
    if (!genresData?.genres || !movie?.genre_ids) return [];
    const genreMap = genresData.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
    return movie.genre_ids
      .slice(0, 2) // Show only first 2 genres
      .map((id) => genreMap[id])
      .filter(Boolean);
  };

  const genreNames = getGenreNames();

  // Get age rating from release_dates (prefer KR, fallback to US)
  const getAgeRating = () => {
    if (!movieDetails?.release_dates?.results) return null;
    
    // Try to find Korean rating first
    const krRelease = movieDetails.release_dates.results.find(
      (release) => release.iso_3166_1 === "KR"
    );
    if (krRelease?.release_dates?.[0]?.certification) {
      return krRelease.release_dates[0].certification;
    }
    
    // Fallback to US rating
    const usRelease = movieDetails.release_dates.results.find(
      (release) => release.iso_3166_1 === "US"
    );
    if (usRelease?.release_dates?.[0]?.certification) {
      return usRelease.release_dates[0].certification;
    }
    
    return null;
  };

  const ageRating = getAgeRating();

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
            {genreNames.length > 0 && (
              <div className="movie-genres">
                {genreNames.map((genre, idx) => (
                  <span key={idx} className="genre-tag">
                    {genre}
                  </span>
                ))}
              </div>
            )}
            <div className="movie-meta">
              <span className="release-date">{releaseYear}</span>
              <span className="rating">{movie.vote_average?.toFixed(1)}</span>
              {ageRating && <span className="age-rating">{ageRating}</span>}
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
