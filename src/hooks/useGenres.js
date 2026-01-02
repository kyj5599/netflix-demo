import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGenres = () => {
  return api.get(`/genre/movie/list`);
};

export const useGenresQuery = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    select: (result) => result.data,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - genres don't change often
  });
};

export default useGenresQuery;
