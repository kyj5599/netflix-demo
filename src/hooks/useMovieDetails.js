import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetails = (movieId) => {
  if (!movieId) return Promise.resolve(null);
  return api.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "release_dates,videos",
    },
  });
};

export const useMovieDetailsQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    select: (result) => result?.data,
    enabled: !!movieId,
    staleTime: 1000 * 60 * 60, // 1 hour
    suspense: true,
  });
};

export default useMovieDetailsQuery;

