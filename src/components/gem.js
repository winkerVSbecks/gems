import React from 'react';
import Color from 'color';
import Polygon from './polygon';
import Glow from './glow';
import Cuts from './cuts';
import { generatePointDef, generatePointsAtOffset } from '../utils/geometry';

const Gem = ({
  idx,
  vertices,
  color,
  location,
  lightSource,
  glowMixer,
  isGlowing,
  addGlow,
  removeGlow,
}) => {
  const centerCutPoints = generatePointDef(
    generatePointsAtOffset(location, vertices)
  );

  function onEnter() {
    if (!isGlowing) {
      addGlow(idx);
    }
  }

  function onLeave() {
    if (isGlowing) {
      removeGlow(idx);
    }
  }

  const clr = isGlowing ? Color(color).lighten(0.4).hexString() : color;

  return (
    <g onMouseEnter={ onEnter } onMouseLeave={ onLeave }
      onTouchStart={ onEnter } onTouchEnd={ onLeave }>
      <Glow points={ centerCutPoints }
        color={ color } mixer={ glowMixer } enabled={ isGlowing } />
      <Polygon points={ centerCutPoints }
        color={ clr } />
      <Cuts { ...{ vertices, color, location, lightSource, isGlowing } } />
    </g>
  );
};

Gem.propTypes = {
  idx: React.PropTypes.number,
  vertices: React.PropTypes.array,
  color: React.PropTypes.string,
  location: React.PropTypes.object,
  lightSource: React.PropTypes.array,
  glowMixer: React.PropTypes.string,
  isGlowing: React.PropTypes.bool,
  addGlow: React.PropTypes.func,
  removeGlow: React.PropTypes.func,
};

export default Gem;
