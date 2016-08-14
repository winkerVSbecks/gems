import createLogger from 'redux-logger';
import immutableToJS from './immutable-to-js';

export default createLogger({
  collapsed: true,
  logger: console,
  stateTransformer: (state) => {
    return immutableToJS(state);
  },
});
