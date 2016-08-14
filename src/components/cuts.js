import { List } from 'immutable';
import React from 'react';
import Polygon from './polygon';

function Cuts({ cuts }) {
  return (
    <g>
      {
        cuts.map((cut, idx) => {
          return (
            <Polygon key={ idx }
              points={ cut.get('points') }
              color={ cut.get('color') } />
          );
        })
      }
    </g>
  );
}

Cuts.propTypes = {
  cuts: React.PropTypes.instanceOf(List).isRequired,
};

export default Cuts;
