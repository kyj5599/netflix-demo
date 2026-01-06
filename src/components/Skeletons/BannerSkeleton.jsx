import React from "react";
import "./BannerSkeleton.style.css";

const BannerSkeleton = () => {
  return (
    <div className="banner-skeleton">
      <div className="banner-skeleton-overlay"></div>
      <div className="banner-skeleton-content">
        <div className="banner-skeleton-title"></div>
        <div className="banner-skeleton-description">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
        <div className="banner-skeleton-button"></div>
      </div>
    </div>
  );
};

export default BannerSkeleton;

