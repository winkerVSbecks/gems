import React from 'react';
import Polygon from './polygon';
import Cuts from './cuts';
import Color from 'color';
import { generatePointDef, generatePointsAtOffset } from '../utils/geometry';

const Gem = ({ vertices, color, center }) => {
  const centerCutPoints = generatePointDef(
    generatePointsAtOffset(center, vertices)
  );

  return (
    <g>
      <Polygon points={ centerCutPoints }
        color={ Color(color).lighten(0.5).hexString() } />
      <Cuts { ...{vertices, color, center} } />
    </g>
  );
};

Gem.propTypes = {
  vertices: React.PropTypes.array,
  color: React.PropTypes.string,
  center: React.PropTypes.object,
};

export default Gem;
