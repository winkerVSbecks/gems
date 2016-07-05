import React from 'react';

function BlurFilter() {
  return (
    <defs>
      <filter id="glow" x="-200%" y="-200%" width="400%" height="400%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
    </defs>
  );
}

export default BlurFilter;
