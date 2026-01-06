import React from "react";
import "./SliderSkeleton.style.css";

const SliderSkeleton = () => {
  return (
    <div className="slider-skeleton-wrapper">
      <div className="slider-skeleton-title"></div>
      <div className="slider-skeleton-container">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="slider-skeleton-card">
            <div className="slider-skeleton-poster"></div>
            <div className="slider-skeleton-info">
              <div className="slider-skeleton-text"></div>
              <div className="slider-skeleton-text short"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderSkeleton;

