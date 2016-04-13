import React from 'react';

const Polygon = ({ points, color }) => {
  const ptsDef = points.join(' ');

  return (
    <polygon points={ ptsDef } fill={ color } />
  );
};

Polygon.propTypes = {
  points: React.PropTypes.array,
  color: React.PropTypes.string,
};

export default Polygon;
