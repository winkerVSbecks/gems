import React from 'react';
import Polygon from './polygon';
import Color from 'color';
import { makeCuts } from '../utils/geometry';

const Cuts = ({ vertices, color, center }) => {
  return (
    <g>
      {
        makeCuts(center, vertices).map((verts, idx) => {
          return (
            <Polygon key={idx}
              points={ verts }
              color={ Color(color).lighten(0.1 * idx).hexString() } />
          );
        })
      }
    </g>
  );
};

Cuts.propTypes = {
  vertices: React.PropTypes.array,
  color: React.PropTypes.string,
  center: React.PropTypes.object,
};

export default Cuts;
