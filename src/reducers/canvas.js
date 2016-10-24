import {
  WINDOW_RESIZE,
  SET_COLOR,
  PATRIOT_CLRS,
  TOGGLE_ABOUT,
} from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  width: 100,
  height: 100,
  w: 100,
  h: 100,
  bgColor: PATRIOT_CLRS.bg,
  isAboutVisible: false,
});

function canvasReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case WINDOW_RESIZE:
      return state.merge(action.payload);

    case SET_COLOR:
      return state.set('bgColor', action.payload.bg);

    case TOGGLE_ABOUT:
      return state.set('isAboutVisible', !state.get('isAboutVisible'));

    default:
      return state;
  }
}

export default canvasReducer;
