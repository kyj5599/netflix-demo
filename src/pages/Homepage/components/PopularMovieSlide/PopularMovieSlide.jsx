import React from "react";
import usePopularMoviesQuery from "../../../../hooks/usePopularMovies";
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  return (
    <MovieSlider
      responsive={responsive}
      movies={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title="Popular Movies"
      showTopBadge={true}
    />
  );
};

export default PopularMovieSlide;
