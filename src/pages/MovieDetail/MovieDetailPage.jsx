import React, { useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import useMovieDetailsQuery from "../../hooks/useMovieDetails";
import useMovieRecommendationsQuery from "../../hooks/useMovieRecommendations";
import useMovieReviewsQuery from "../../hooks/useMovieReviews";
import useGenresQuery from "../../hooks/useGenres";
import MovieSlider from "../../common/MovieSlider/MovieSlider";
import { responsive } from "../../constants/responsive";
import { Alert } from "react-bootstrap";
import { getYouTubeTrailerKey } from "../../utils/videoUtils";
import VideoModal from "../../components/VideoModal/VideoModal";
import SliderSkeleton from "../../components/Skeletons/SliderSkeleton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./MovieDetail.style.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { data: movie, isError, error } = useMovieDetailsQuery(id);
  const { data: genresData } = useGenresQuery();

  if (isError || !movie) {
    return <Alert variant="danger">Error: {error?.message || "Movie not found"}</Alert>;
  }

  // Get genre names
  const getGenreNames = () => {
    if (!genresData?.genres || !movie?.genres) return [];
    const genreMap = genresData.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
    return movie.genres.map((genre) => genreMap[genre.id]).filter(Boolean);
  };

  const genreNames = getGenreNames();

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get backdrop image
  const backdropUrl = movie.backdrop_path
    ? `https://media.themoviedb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
    ? `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path}`
    : "";

  // Get poster image
  const posterUrl = movie.poster_path
    ? `https://media.themoviedb.org/t/p/w500${movie.poster_path}`
    : "";

  // Get YouTube trailer
  const trailerKey = getYouTubeTrailerKey(movie);

  // Handle play button click
  const handlePlayClick = () => {
    if (trailerKey) {
      setIsVideoModalOpen(true);
    }
  };

  return (
    <div className="movie-detail-page">
      {/* Hero Section */}
      <div
        className="movie-detail-hero"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      >
        <div className="movie-detail-overlay"></div>
        <div className="movie-detail-hero-content">
          <h1 className="movie-detail-title">{movie.title}</h1>
          <p className="movie-detail-description">{movie.overview}</p>
          <button
            className="movie-detail-play-btn"
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

      {/* Movie Details Section */}
      <div className="movie-detail-content">
        <div className="movie-detail-main">
          <div className="movie-detail-poster">
            {posterUrl && <img src={posterUrl} alt={movie.title} />}
          </div>
          <div className="movie-detail-info">
            <div className="movie-detail-genres">
              {genreNames.map((genre, idx) => (
                <span key={idx} className="genre-badge">
                  {genre}
                </span>
              ))}
            </div>
            <h2 className="movie-detail-info-title">{movie.title}</h2>
            {movie.tagline && (
              <p className="movie-detail-tagline">{movie.tagline}</p>
            )}
            <div className="movie-detail-rating">
              <span className="rating-value">{movie.vote_average?.toFixed(1)}</span>
              <span className="popularity-value">{movie.popularity?.toFixed(2)}</span>
            </div>
            <p className="movie-detail-synopsis">{movie.overview}</p>
            <div className="movie-detail-meta">
              <div className="meta-item">
                <span className="meta-label">Budget:</span>
                <span className="meta-value">{formatCurrency(movie.budget)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Revenue:</span>
                <span className="meta-value">{formatCurrency(movie.revenue)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Release Date:</span>
                <span className="meta-value">{formatDate(movie.release_date)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Run time:</span>
                <span className="meta-value">{movie.runtime}분</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies Section */}
        <Suspense fallback={<SliderSkeleton />}>
          <RelatedMoviesSection movieId={id} />
        </Suspense>

        {/* Reviews Section */}
        <Suspense fallback={<LoadingSpinner size="medium" fullHeight />}>
          <ReviewsSection movieId={id} />
        </Suspense>
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

// Related Movies Section Component (for Suspense)
const RelatedMoviesSection = ({ movieId }) => {
  const { data: recommendations } = useMovieRecommendationsQuery(movieId);

  if (!recommendations?.results || recommendations.results.length === 0) {
    return null;
  }

  return (
    <div className="movie-detail-section">
      <h3 className="section-title">Related Movies</h3>
      <MovieSlider
        responsive={responsive}
        movies={recommendations}
        isError={false}
        error={null}
        title=""
      />
    </div>
  );
};

// Reviews Section Component (for Suspense)
const ReviewsSection = ({ movieId }) => {
  const { data: reviews } = useMovieReviewsQuery(movieId);
  const [expandedReviews, setExpandedReviews] = useState({});

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const toggleReview = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  if (!reviews?.results || reviews.results.length === 0) {
    return null;
  }

  return (
    <div className="movie-detail-section">
      <h3 className="section-title">Reviews</h3>
      <div className="reviews-container">
        {reviews.results.map((review) => {
          const isExpanded = expandedReviews[review.id];
          const shouldTruncate = review.content.length > 300;
          const displayContent = isExpanded || !shouldTruncate
            ? review.content
            : `${review.content.substring(0, 300)}...`;

          return (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-author">
                  <span className="author-name">{review.author}</span>
                  {review.author_details?.rating && (
                    <span className="author-rating">
                      {review.author_details.rating}/10
                    </span>
                  )}
                </div>
                <span className="review-date">
                  {formatDate(review.created_at)}
                </span>
              </div>
              <div className="review-content">
                <p>{displayContent}</p>
                {shouldTruncate && (
                  <button
                    className="review-expand-btn"
                    onClick={() => toggleReview(review.id)}
                  >
                    {isExpanded ? "접기" : "더보기"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieDetailPage;
