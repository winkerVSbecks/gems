import {
  WINDOW_RESIZE,
  PROCESS_BLUE,
  PATRIOT,
  MOVE_LIGHT_SOURCE,
  ADD_GLOW,
  REMOVE_GLOW,
  patriotClrs,
  processBlueClrs,
} from '../constants';
import { fromJS } from 'immutable';
import polygon from '../utils/shapes';

const sides = [3, 4, 5, 6, 10];

const INITIAL_STATE = fromJS({
  width: 100,
  height: 100,
  w: 100,
  h: 100,
  s: 100,
  light: [100, 0],
  bgColor: patriotClrs.bg,
  glowMixer: patriotClrs.bg,
  gems: sides.map((side, idx) => {
    return {
      idx: idx,
      vertices: polygon(side, 5),
      location: { x: 20 + idx * 15, y: 50 },
      color: patriotClrs.gems[idx],
      isGlowing: false,
    };
  }),
});

function canvasReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

    case WINDOW_RESIZE:
      if (action.payload.width > 600) {
        return state.merge(action.payload)
                    .update('gems', gems => {
                      return gems.map((gem, idx) => {
                        return gem.merge(fromJS({
                          vertices: polygon(sides[idx], 5),
                          location: { x: 20 + idx * 15, y: 50 },
                        }));
                      });
                    });
      }
      return state.merge(action.payload)
                  .update('gems', gems => {
                    return gems.map((gem, idx) => {
                      return gem.merge(fromJS({
                        vertices: polygon(sides[idx], 4),
                        location: { x: 7.5 + idx * 20.5, y: 50 },
                      }));
                    });
                  });

    case PROCESS_BLUE:
      return state.set('bgColor', processBlueClrs.bg)
                  .set('glowMixer', processBlueClrs.glow)
                  .update('gems', gems => {
                    return gems.map((gem, idx) => {
                      return gem.set('color', processBlueClrs.gems[idx]);
                    });
                  });

    case PATRIOT:
      return state.set('bgColor', patriotClrs.bg)
                  .set('glowMixer', patriotClrs.glow)
                  .update('gems', gems => {
                    return gems.map((gem, idx) => {
                      return gem.set('color', patriotClrs.gems[idx]);
                    });
                  });

    case MOVE_LIGHT_SOURCE:
      return state.set('light', fromJS(action.payload));

    case ADD_GLOW:
      return state.setIn(['gems', action.payload, 'isGlowing'], true);

    case REMOVE_GLOW:
      return state.setIn(['gems', action.payload, 'isGlowing'], false);

    default:
      return state;

  }
}

export default canvasReducer;
