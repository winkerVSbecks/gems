import { combineReducers } from 'redux';
import canvas from './canvas';
import gems from './gems';
import light from './light';

const rootReducer = combineReducers({
  canvas,
  gems,
  light,
});

export default rootReducer;
