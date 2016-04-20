import React from 'react';
import Polygon from './polygon';
import { makeCuts } from '../utils/geometry';
import { lightFaces } from '../utils/lights';

const Cuts = ({ vertices, color, location, lightSource, isGlowing }) => {
  const faceColours =  lightFaces(vertices, location, lightSource,
                                  color, isGlowing);

  return (
    <g>
      {
        makeCuts(location, vertices).map((cutVertices, idx) => {
          return (
            <Polygon key={idx}
              points={ cutVertices }
              color={ faceColours[idx] } />
          );
        })
      }
    </g>
  );
};

Cuts.propTypes = {
  vertices: React.PropTypes.array,
  color: React.PropTypes.string,
  location: React.PropTypes.object,
  lightSource: React.PropTypes.array,
  isGlowing: React.PropTypes.bool,
};

export default Cuts;
