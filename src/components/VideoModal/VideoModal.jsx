import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { getYouTubeEmbedUrl } from "../../utils/videoUtils";
import "./VideoModal.style.css";

const VideoModal = ({ isOpen, onClose, videoKey, movieTitle }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !videoKey) return null;

  const embedUrl = getYouTubeEmbedUrl(videoKey);

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const modalContent = (
    <div className="video-modal-overlay" onClick={handleBackdropClick}>
      <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={handleCloseClick} aria-label="닫기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="video-modal-content">
          <iframe
            src={embedUrl}
            title={movieTitle || "영화 트레일러"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-modal-iframe"
          />
        </div>
      </div>
    </div>
  );

  // Portal을 사용하여 body에 직접 렌더링
  return createPortal(modalContent, document.body);
};

export default VideoModal;

