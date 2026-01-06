import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReviews = (movieId) => {
  if (!movieId) return Promise.resolve(null);
  return api.get(`/movie/${movieId}/reviews`);
};

export const useMovieReviewsQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-reviews", movieId],
    queryFn: () => fetchMovieReviews(movieId),
    select: (result) => result.data,
    enabled: !!movieId,
    suspense: true,
  });
};

export default useMovieReviewsQuery;

