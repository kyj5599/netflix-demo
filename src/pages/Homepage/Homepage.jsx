import React, { Suspense } from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import BannerSkeleton from "../../components/Skeletons/BannerSkeleton";
import SliderSkeleton from "../../components/Skeletons/SliderSkeleton";
import "./Homepage.style.css";

// 1. 배너 => popular movie 중에서 랜덤으로 하나 선택
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie

const Homepage = () => {
  return (
    <div className="homepage-container">
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>
      <Suspense fallback={<SliderSkeleton />}>
        <PopularMovieSlide />
      </Suspense>
      <Suspense fallback={<SliderSkeleton />}>
        <TopRatedMovieSlide />
      </Suspense>
      <Suspense fallback={<SliderSkeleton />}>
        <UpcomingMovieSlide />
      </Suspense>
    </div>
  );
};

export default Homepage;
