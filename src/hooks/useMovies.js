import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovies = (params = {}) => {
  const {
    page = 1,
    sortBy = "popularity.desc",
    genreId,
    query,
  } = params;

  // 검색 쿼리가 있으면 검색 API 사용
  if (query) {
    return api.get(`/search/movie`, {
      params: {
        query,
        page,
      },
    });
  }

  // 장르 필터가 있으면 discover API 사용
  if (genreId) {
    return api.get(`/discover/movie`, {
      params: {
        page,
        sort_by: sortBy,
        with_genres: genreId,
      },
    });
  }

  // 기본은 popular movies
  return api.get(`/movie/popular`, {
    params: {
      page,
    },
  });
};

export const useMoviesQuery = (params = {}) => {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => fetchMovies(params),
    select: (result) => result.data,
    keepPreviousData: true, // 페이지네이션 시 이전 데이터 유지
    suspense: true,
  });
};

export default useMoviesQuery;

