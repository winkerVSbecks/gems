import {
  WINDOW_RESIZE,
} from '../constants';
import { fromJS } from 'immutable';
import * as shapes from '../utils/shapes';

const clrs = ['#34A766', '#FFE200', '#0072BB', '#DB3B43', '#FE7541', '#4E0250'];

const INITIAL_STATE = fromJS({
  width: 100,
  height: 100,
  w: 100,
  h: 100,
  s: 100,
  light: { x: 100, y: 0 },
  gem: {
    vertices: shapes.square(20),
    c: { x: 50, y: 50 },
    color: clrs[1],
  },
  gems: [{
    vertices: shapes.square(20),
    c: { x: 50, y: 50 },
    color: clrs[0],
  }, {
    vertices: shapes.triangle(20),
    c: { x: 50, y: 50 },
    color: clrs[1],
  }],
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
