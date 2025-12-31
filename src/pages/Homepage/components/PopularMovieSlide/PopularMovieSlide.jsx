import React from "react";
import usePopularMoviesQuery from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./PopularMovieSlide.style.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
    partialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    partialVisibilityGutter: 0,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    partialVisibilityGutter: 0,
  },
};

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return (
      <div className="popular-movie-slide-wrapper">
        <h3 className="popular-movie-title">Popular Movies</h3>
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
      <h3 className="popular-movie-title">Popular Movies</h3>
      <Carousel
        infinite={false}
        centerMode={false}
        itemClass="movie-slider"
        containerClass="carousel-container"
        responsive={responsive}
        arrows={true}
        showDots={false}
      >
        {data.results.map((movie, index) => (
          <div key={index} className={index === 0 ? "first-movie-card" : ""}>
            <MovieCard movie={movie} index={index} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PopularMovieSlide;
