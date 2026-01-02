import React from "react";
import "./MovieSlider.style.css";
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard";

const MovieSlider = ({
  responsive,
  movies,
  isLoading,
  isError,
  error,
  title,
  showTopBadge = false,
}) => {
  if (isLoading) {
    return (
      <div className="popular-movie-slide-wrapper">
        {title && <h3 className="popular-movie-title">{title}</h3>}
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger"></Alert>;
  }

  return (
    <div className="popular-movie-slide-wrapper">
      {title && <h3 className="popular-movie-title">{title}</h3>}
      <Carousel
        infinite={false}
        centerMode={false}
        itemClass="movie-slider"
        containerClass="carousel-container"
        responsive={responsive}
        arrows={true}
        showDots={false}
      >
        {movies?.results?.map((movie, index) => (
          <div key={index} className={index === 0 ? "first-movie-card" : ""}>
            <MovieCard
              movie={movie}
              index={index}
              showTopBadge={showTopBadge}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
