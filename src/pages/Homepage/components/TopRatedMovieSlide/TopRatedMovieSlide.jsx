import React from "react";
import useTopRatedMoviesQuery from "../../../../hooks/useTopRatedMovies";
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  return (
    <MovieSlider
      responsive={responsive}
      movies={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title="Top Rated Movies"
      showTopBadge={true}
    />
  );
};

export default TopRatedMovieSlide;
