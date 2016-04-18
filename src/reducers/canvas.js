import {
  WINDOW_RESIZE,
} from '../constants';
import { fromJS } from 'immutable';
import polygon from '../utils/shapes';

const clrs = ['#34A766', '#FFE200', '#0072BB', '#DB3B43', '#FE7541', '#4E0250'];

const INITIAL_STATE = fromJS({
  width: 100,
  height: 100,
  w: 100,
  h: 100,
  s: 100,
  light: { x: 100, y: 0 },
  gems: [0, 1, 2, 3, 4].map(idx => {
    return {
      vertices: polygon(idx + 1, 10),
      location: { x: 10 + idx * 20, y: 10 },
      color: clrs[idx],
    };
  }),
});

function canvasReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

  case WINDOW_RESIZE:
    return state.merge(action.payload);

  default:
    return state;
  }
}

export default canvasReducer;
