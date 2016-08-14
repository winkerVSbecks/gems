import { Map, List } from 'immutable';
import React from 'react';
import Polygon from './polygon';
import Cuts from './cuts';

function Gem({ idx, addGlow, removeGlow, glow, centerCut, cuts }) {
  const onEnter = () => addGlow(idx);
  const onLeave = () => removeGlow(idx);

  return (
    <g onMouseEnter={ onEnter } onMouseLeave={ onLeave }
      onTouchStart={ onEnter } onTouchEnd={ onLeave }>

      <Polygon
        points={ glow.get('points') }
        color={ glow.get('color') }
        filter={ glow.get('filter') }
        opacity={ glow.get('opacity') } />

      <Polygon
        points={ centerCut.get('points') }
        color={ centerCut.get('color') } />

      <Cuts cuts={ cuts } />

    </g>
  );
}

Gem.propTypes = {
  idx: React.PropTypes.number.isRequired,
  addGlow: React.PropTypes.func.isRequired,
  removeGlow: React.PropTypes.func.isRequired,
  glow: React.PropTypes.instanceOf(Map).isRequired,
  centerCut: React.PropTypes.instanceOf(Map).isRequired,
  cuts: React.PropTypes.instanceOf(List).isRequired,
};

export default Gem;
