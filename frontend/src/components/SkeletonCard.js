import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="doctor-card skeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-content">
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;