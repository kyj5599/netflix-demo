import React from "react";
import "./LoadingSpinner.style.css";

const LoadingSpinner = ({ size = "medium", fullHeight = false }) => {
  const sizeClass = `loading-spinner-${size}`;
  const containerClass = fullHeight
    ? "loading-container loading-container-full"
    : "loading-container";

  return (
    <div className={containerClass}>
      <div className={`loading-spinner ${sizeClass}`}></div>
    </div>
  );
};

export default LoadingSpinner;

