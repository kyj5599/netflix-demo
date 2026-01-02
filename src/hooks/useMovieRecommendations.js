import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieRecommendations = (movieId) => {
  if (!movieId) return Promise.resolve(null);
  return api.get(`/movie/${movieId}/recommendations`);
};

export const useMovieRecommendationsQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-recommendations", movieId],
    queryFn: () => fetchMovieRecommendations(movieId),
    select: (result) => result.data,
    enabled: !!movieId,
  });
};

export default useMovieRecommendationsQuery;

