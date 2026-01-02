import React from "react";
import useUpcomingMoviesQuery from "../../../../hooks/useUpcomingMovies";
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  return (
    <MovieSlider
      responsive={responsive}
      movies={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title="Upcoming Movies"
      showTopBadge={true}
    />
  );
};

export default UpcomingMovieSlide;
