import {
  WINDOW_RESIZE,
  SET_COLOR,
  SET_GLOW,
  PATRIOT_CLRS,
} from '../constants';
import { fromJS } from 'immutable';
import polygon from '../utils/shapes';

const sides = [3, 4, 5, 6, 10];

const INITIAL_STATE = fromJS({
  glowMixer: PATRIOT_CLRS.bg,
  gems: sides.map((side, idx) => {
    return {
      idx: idx,
      vertices: polygon(side, 5),
      location: comfortable(idx),
      color: PATRIOT_CLRS.gems[idx],
      isGlowing: false,
    };
  }),
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
 * Helpers for resizing the gems
 */
function cozy(idx) {
  return { x: 7.5 + idx * 20.5, y: 50 };
}

function comfortable(idx) {
  return { x: 20 + idx * 15, y: 50 };
}

function resizeGem(idx, size) {
  return {
    vertices: polygon(sides[idx], size),
    location: size === 4 ? cozy(idx) : comfortable(idx),
  };
}

function resizeGems(width, state) {
  const size = (width > 600) ? 5 : 4;

  return state.update('gems', gems => {
    return gems.map((g, i) => {
      return g.merge( fromJS( resizeGem(i, size) ) );
    });
  });
}
