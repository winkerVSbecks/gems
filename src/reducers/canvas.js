import {
  WINDOW_RESIZE,
} from '../constants';
import { fromJS } from 'immutable';

const clrs = ['#FFE200', '#34A766', '#0072BB', '#DB3B43', '#FE7541'];
const angles = {
  45: Math.PI / 4,
  90: Math.PI / 2,
  135: 3 * Math.PI / 4,
  225: 5 * Math.PI / 4,
  315: 7 * Math.PI / 4,
};

const INITIAL_STATE = fromJS({
  width: 100,
  height: 100,
  w: 100,
  h: 100,
  s: 100,
  light: { x: 100, y: 0 },
  gem: {
    vertices: [{
      theta: angles[45],
      r: 10,
    }, {
      theta: angles[315],
      r: 10,
    }, {
      theta: angles[225],
      r: 10,
    }, {
      theta: angles[135],
      r: 10,
    }],
    c: { x: 50, y: 50 },
    color: clrs[1],
  },
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
