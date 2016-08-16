import {
  WINDOW_RESIZE,
  SET_COLOR,
  SET_GLOW,
  PATRIOT_CLRS,
} from '../constants';
import { fromJS } from 'immutable';
import polygon from '../utils/shapes';

const gemSize = 10;
const gemSides = 6;

const INITIAL_STATE = fromJS({
  glowMixer: PATRIOT_CLRS.bg,
  gems: [{
    idx: 0,
    vertices: polygon(gemSides, gemSize),
    location: { x: 50, y: 50 },
    color: PATRIOT_CLRS.gems[0],
    isGlowing: false,
  }],
});

function gemReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case WINDOW_RESIZE:
      return resizeGems(action.payload.width, state);

    case SET_COLOR:
      return state.set('glowMixer', action.payload.glow)
                  .update('gems', gems => {
                    return gems.map((gem, idx) => {
                      return gem.set('color', action.payload.gems[idx]);
                    });
                  });

    case SET_GLOW:
      return state.setIn(
        ['gems', action.payload.gem, 'isGlowing'],
        action.payload.value
      );

    default:
      return state;
  }
}

export default gemReducer;


/**
 * Helper for resizing the gems
 */
function resizeGems(width, state) {
  return state.update('gems', gems => {
    return gems.map(gem => gem.merge({ vertices: polygon(gemSides, gemSize) }));
  });
}
