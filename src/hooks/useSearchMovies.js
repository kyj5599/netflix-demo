import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovies = (query) => {
  return api.get(`/search/movie`, {
    params: {
      query: query,
    },
  });
};

export const useSearchMoviesQuery = (query) => {
  return useQuery({
    queryKey: ["movie-search", query],
    queryFn: () => fetchSearchMovies(query),
    select: (result) => result.data,
    enabled: !!query, // query가 있을 때만 실행
  });
};

export default useSearchMoviesQuery;

