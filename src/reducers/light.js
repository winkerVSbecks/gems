import { MOVE_LIGHT_SOURCE } from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  origin: [100, 0],
});

function lightReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case MOVE_LIGHT_SOURCE:
      return state.set('origin', fromJS(action.payload));

    default:
      return state;
  }
}

export default lightReducer;
