/**
 * TMDB API에서 가져온 비디오 데이터에서 YouTube 트레일러 키를 찾습니다.
 * @param {Object} movie - TMDB 영화 데이터 (videos 포함)
 * @returns {string|null} YouTube 비디오 키 또는 null
 */
export const getYouTubeTrailerKey = (movie) => {
  if (!movie?.videos?.results || movie.videos.results.length === 0) {
    return null;
  }

  const videos = movie.videos.results;

  // 1. YouTube 트레일러 우선 찾기
  const trailer = videos.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
  if (trailer) return trailer.key;

  // 2. YouTube 티저 찾기
  const teaser = videos.find(
    (video) => video.site === "YouTube" && video.type === "Teaser"
  );
  if (teaser) return teaser.key;

  // 3. 첫 번째 YouTube 비디오 찾기
  const firstYouTube = videos.find((video) => video.site === "YouTube");
  if (firstYouTube) return firstYouTube.key;

  return null;
};

/**
 * YouTube 비디오 키로 YouTube URL을 생성합니다.
 * @param {string} videoKey - YouTube 비디오 키
 * @returns {string} YouTube URL
 */
export const getYouTubeUrl = (videoKey) => {
  if (!videoKey) return null;
  return `https://www.youtube.com/watch?v=${videoKey}`;
};

/**
 * YouTube 비디오 키로 YouTube 임베드 URL을 생성합니다.
 * @param {string} videoKey - YouTube 비디오 키
 * @returns {string} YouTube 임베드 URL
 */
export const getYouTubeEmbedUrl = (videoKey) => {
  if (!videoKey) return null;
  return `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
};

