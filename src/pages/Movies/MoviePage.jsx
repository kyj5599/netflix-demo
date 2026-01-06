import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import useMoviesQuery from "../../hooks/useMovies";
import useGenresQuery from "../../hooks/useGenres";
import MovieCard from "../../common/MovieCard";
import { Alert } from "react-bootstrap";
import MovieGridSkeleton from "../../components/Skeletons/MovieGridSkeleton";
import "./MoviePage.style.css";

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "인기 많은순" },
  { value: "popularity.asc", label: "인기 적은순" },
];

const MoviePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showGenreMenu, setShowGenreMenu] = useState(false);

  // URL 파라미터에서 값 가져오기
  const page = parseInt(searchParams.get("page") || "1", 10);
  const sortBy = searchParams.get("sort_by") || "popularity.desc";
  const genreId = searchParams.get("genre");
  const query = searchParams.get("q");

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-dropdown")) {
        setShowSortMenu(false);
        setShowGenreMenu(false);
      }
    };

    if (showSortMenu || showGenreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showSortMenu, showGenreMenu]);

  // API 호출
  const { data, isError, error } = useMoviesQuery({
    page,
    sortBy,
    genreId: genreId ? parseInt(genreId, 10) : undefined,
    query,
  });

  const { data: genresData } = useGenresQuery();

  // 정렬 변경
  const handleSortChange = (sortValue) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortValue);
    newParams.set("page", "1");
    setSearchParams(newParams);
    setShowSortMenu(false);
  };

  // 장르 필터 변경
  const handleGenreChange = (genreId) => {
    const newParams = new URLSearchParams(searchParams);
    if (genreId) {
      newParams.set("genre", genreId.toString());
    } else {
      newParams.delete("genre");
    }
    newParams.delete("q"); // 장르 필터 시 검색 쿼리 제거
    newParams.set("page", "1");
    setSearchParams(newParams);
    setShowGenreMenu(false);
  };

  // 페이지 변경
  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 현재 선택된 정렬 옵션
  const currentSortLabel = useMemo(() => {
    return (
      SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "인기 많은순"
    );
  }, [sortBy]);

  // 현재 선택된 장르
  const currentGenre = useMemo(() => {
    if (!genreId || !genresData?.genres) return null;
    return genresData.genres.find((g) => g.id === parseInt(genreId, 10));
  }, [genreId, genresData]);

  // 페이지네이션 계산
  const totalPages = data?.total_pages || 1;
  const currentPage = data?.page || 1;
  const pagesToShow = useMemo(() => {
    const pages = [];
    const maxPages = 5;

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  if (isError) {
    return (
      <div className="movie-page-container">
        <Alert variant="danger">
          Error: {error?.message || "Failed to load movies"}
        </Alert>
      </div>
    );
  }

  return (
    <div className="movie-page-container">
      {/* Filters and Search */}
      <div className="movie-page-header">
        <div className="filter-buttons">
          <div className="filter-dropdown">
            <button
              className="filter-btn"
              onClick={() => {
                setShowSortMenu(!showSortMenu);
                setShowGenreMenu(false);
              }}
            >
              정렬기준
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {showSortMenu && (
              <div className="dropdown-menu">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={`dropdown-item ${
                      sortBy === option.value ? "active" : ""
                    }`}
                    onClick={() => handleSortChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="filter-dropdown">
            <button
              className="filter-btn"
              onClick={() => {
                setShowGenreMenu(!showGenreMenu);
                setShowSortMenu(false);
              }}
            >
              장르별 검색
              {currentGenre && (
                <span className="filter-badge">{currentGenre.name}</span>
              )}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {showGenreMenu && (
              <div className="dropdown-menu genre-menu">
                {genresData?.genres?.map((genre) => (
                  <button
                    key={genre.id}
                    className={`dropdown-item ${
                      genreId === genre.id.toString() ? "active" : ""
                    }`}
                    onClick={() => handleGenreChange(genre.id)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieGridContent movies={data?.results} />
      </Suspense>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {pagesToShow.map((pageNum, idx) => {
            if (pageNum === "...") {
              return (
                <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                  ...
                </span>
              );
            }
            return (
              <button
                key={pageNum}
                className={`pagination-btn ${
                  currentPage === pageNum ? "active" : ""
                }`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

// Movie Grid Content Component (for Suspense)
const MovieGridContent = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies?.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          index={index}
          showTopBadge={false}
        />
      ))}
    </div>
  );
};

export default MoviePage;
