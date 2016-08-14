import { List } from 'immutable';
import React from 'react';

function Polygon({ points, color, filter = '', opacity = 1 }) {
  const ptsDef = points.join(' ');

  return (
    <polygon points={ ptsDef }
      fill={ color }
      filter={ filter }
      opacity={ opacity } />
  );
}

Polygon.propTypes = {
  points: React.PropTypes.instanceOf(List).isRequired,
  color: React.PropTypes.string.isRequired,
  filter: React.PropTypes.string,
  opacity: React.PropTypes.number,
};

export default Polygon;
